import { useState } from "react";
import Warning from "../segment/Warning";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  let history: any = useHistory();
  const [loginCheck, setLoginCheck] = useState(false);
  const [input, setInput] = useState({
    id: "",
    pw: "",
  });

  function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput((prev: any) => {
      return { ...prev, [name]: value };
    });
  }

  function handleOnclick(e: React.MouseEvent<HTMLButtonElement>) {
    axios
      .post("http://localhost:3001/login", {
        id: input.id,
        pw: input.pw,
      })
      .then(function (res) {
        if (!res.data.auth) setLoginCheck(true);
        else {
          localStorage.setItem("token", JSON.stringify(res.data.token));

          history.push({
            pathname: "/success",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    e.preventDefault();
  }
  return (
    <div className=" text-gray-600 body-font flex">
      <div className="container pt-32 flex justify-center items-center ">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-center text-gray-900 text-lg font-medium title-font mb-5">
            로그인
          </h2>
          <div className="relative mb-4">
            <label
              htmlFor="full-name"
              className="leading-7 text-sm text-gray-600"
            >
              아이디
            </label>
            <input
              autoFocus
              type="text"
              name="id"
              value={input.id}
              onChange={changeInput}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              비밀번호
            </label>
            <input
              type="password"
              name="pw"
              value={input.pw}
              onChange={changeInput}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {loginCheck && (
              <Warning text=" 가입하지 않은 아이디이거나, 잘못된 비밀번호입니다." />
            )}
          </div>
          <button
            onClick={handleOnclick}
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            로그인
          </button>
          <a className="pt-4 text-right" href="/register">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};
export default Login;
