import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Warning from '../segment/Warning';

const Register: React.FC = () => {
  let history: any = useHistory();

  const [sameId, setSameId] = useState(false);
  const [sameNickname, setSameNickname] = useState(false);
  const [input, setInput] = useState({
    id: '',
    pw: '',
    nickname: '',
  });
  const [pwSame, setpwSame] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function checkPw(e: React.ChangeEvent<HTMLInputElement>) {
    input.pw === e.target.value ? setpwSame(true) : setpwSame(false);
  }
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(input);

    axios
      .post('http://localhost:3001/register', {
        id: input.id,
        pw: input.pw,
        nickname: input.nickname,
      })
      .then(function (res: any) {
        if (res.data.result === 'duplicateId') setSameId(true);
        else if (res.data.result === 'duplicateNickname') setSameNickname(true);
        else history.push({ pathname: '/success', nickname: res.data });
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
            회원가입
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
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {sameId && <Warning text="이미 등록된 아이디입니다." />}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="full-name"
              className="leading-7 text-sm text-gray-600"
            >
              닉네임
            </label>
            <input
              onChange={handleChange}
              name="nickname"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              type="text"
            />
            {sameNickname && <Warning text="이미 등록된 닉네임입니다." />}
          </div>

          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              비밀번호
            </label>
            <input
              type="password"
              name="pw"
              value={input.pw}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="pwck"
              onChange={checkPw}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {pwSame ? null : <Warning text="비밀번호가 일치하지 않습니다." />}
          </div>
          <button
            onClick={handleSubmit}
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
