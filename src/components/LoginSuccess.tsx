import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function LoginSuccess() {
  const location: any = useLocation();
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    axios
      .post("http://localhost:3001/isUserAuth", null, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (!res.data.auth) {
          console.log(res);
        } else {
          setNickname(res.data.info);
        }
      });
  }, []);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="text-lg">{nickname} 님 반갑습니다 </div>
    </div>
  );
}
export default LoginSuccess;
