import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
const LoginPage = ({ _props }: any) => {
  const [data, setData] = useState();
  const fetchAuthUser = async () => {
    window.location.replace('http://localhost:3000');
  };
  const redirectToSSO = async () => {
    let timer: NodeJS.Timeout | null = null;
    const googleLoginURL = 'http://localhost:2000/';
    const newWindow = window.open(
      googleLoginURL,
      '_blank',
      'width=500,height=600'
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated");
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return <div onClick={redirectToSSO}>click to login</div>;
};
export default LoginPage;

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  try {
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  }

  return {
    props: {
      user: 'tuong',
    },
  };
};
