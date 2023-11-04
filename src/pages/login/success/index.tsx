import { setCookie } from '@/lib/cookie';
import { useEffect } from 'react';

const LoginSuccess = () => {
  useEffect(() => {
    setCookie('isAuthen', 'TRUE');
    setTimeout(() => {
      window.close();
    }, 2000);
  }, []);
  return <div>login Sucess</div>;
};

export default LoginSuccess;
