import { useEffect } from 'react';

const LoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);
  return <div>login Sucess</div>;
};

export default LoginSuccess;
