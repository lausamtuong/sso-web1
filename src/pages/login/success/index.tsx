import { setCookie } from '@/lib/cookie';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const LoginSuccess = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  setCookie('email', String(email));

  useEffect(() => {
    setTimeout(() => {
      setCookie('isAuthen', 'TRUE');
      window.close();
    }, 1000);
  }, []);
  return <div>login Sucess</div>;
};

export default LoginSuccess;
