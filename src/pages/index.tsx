import Image from 'next/image';
import { Inter } from 'next/font/google';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';
// import { useAuth } from '@/modules/auth/AuthProvider';

const inter = Inter({ subsets: ['latin'] });
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
  return <div>{_props.user}</div>;
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
