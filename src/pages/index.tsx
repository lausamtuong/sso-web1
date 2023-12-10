import Image from 'next/image';
import { Inter } from 'next/font/google';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { LOCAL_HOST_URL } from './login';
import axios from 'axios';
import { getCookie } from '@/lib/cookie';
import { jwtDecode } from 'jwt-decode';
// import { useAuth } from '@/modules/auth/AuthProvider';

interface User {
  email: string;
  username: string;
  password: number;
  avatar: string;
  description: string;
  role: string;
}
export default function Home(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const userInfo: User = _props.user.result;
  console.log(_props.user);
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen w-screen">
      <h1 className="font-bold text-2xl">
        Domain Application 1: localhost:3001
      </h1>
      <div className="flex gap-2">
        <Image alt="avt" src={userInfo.avatar} width={250} height={200} />
        <div className="flex flex-col gap-3">
          <div className="flex gap-1">
            <p className="font-bold">User Role: </p>
            <p>{userInfo.role}</p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold">Email: </p>
            <p>{userInfo.email}</p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold">User Name: </p>
            <p>{userInfo.username}</p>
          </div>
          <div className="flex flex-col gap-1 max-w-[300px]">
            <span className="font-bold">Description:</span>
            <p>{userInfo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  try {
    if (context.req.cookies['SAML_ASSERTION']) {
      const token = context.req.cookies['SAML_ASSERTION'];
      const data: any = jwtDecode(String(token));
      if (!data.isAuthen) {
        return {
          redirect: {
            permanent: false,
            destination: '/login',
          },
        };
      }
      let response = await axios.get(
        `${LOCAL_HOST_URL}/api/auth/route?email=${data.email}`
      );
      const result = await response.data;
      return {
        props: {
          user: result,
        },
      };
    }
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
};
