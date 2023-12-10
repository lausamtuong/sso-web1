import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
export const LOCAL_HOST_URL = 'http://localhost:3001';
export const SAML_URL = 'http://localhost:3000';

interface User {
  email: string;
  username: string;
  password: number;
  avatar: string;
  description: string;
  role: string;
}
const LoginPage = ({ result }: any) => {
  // console.log('result: ', result);
  const [data, setData] = useState();
  const fetchAuthUser = async () => {
    window.location.replace(LOCAL_HOST_URL);
  };

  //User rePuest to SP
  const redirectToSSO = async () => {
    let timer: NodeJS.Timeout | null = null;
    const loginURL = `${SAML_URL}?redirectURL=${LOCAL_HOST_URL}/login/success`;
    //User connect to Identity Provider
    const newWindow = window.open(loginURL, '_blank', 'width=500,height=600');
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen dark:bg-gray-800"
      onClick={redirectToSSO}
    >
      <button className="px-4 py-2 border flex gap-2  dark:border-slate-700 rounded-lg  dark:text-slate-200  border-slate-500 text-slate-900  shadow hover:shadow-xl transition duration-150">
        <img
          className="w-6 h-6"
          src="https://cdn3.iconfinder.com/data/icons/wpzoom-developer-icon-set/500/104-512.png"
          loading="lazy"
          alt="google logo"
        />
        <span>Login by SAML SSO</span>
      </button>
    </div>
  );
};
export default LoginPage;
