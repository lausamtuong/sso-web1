import Image from 'next/image';
import { Inter } from 'next/font/google';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { LOCAL_HOST_URL } from './login';
import axios from 'axios';
import { getCookie } from '@/lib/cookie';
// import { useAuth } from '@/modules/auth/AuthProvider';

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  first_login: boolean;
}
export default function Home(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  console.log(_props.user);
  return <div>{_props.user.result.username}</div>;
}
export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  try {
    if (!context.req.cookies['isAuthen']) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }
    const email = context.req.cookies['email'];
    let response = await axios.get(
      `${LOCAL_HOST_URL}/api/auth/route?email=${email}`
    );
    const result = await response.data;
    return {
      props: {
        user: result,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  }
};
