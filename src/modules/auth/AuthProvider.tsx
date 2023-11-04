import { getAccessToken } from '@/lib/token';
import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  logIn: (redirectTo: string) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  accessToken: null,
  logIn: () => {},
  logOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const tokenParam = getAccessToken();
  const [accessToken, setAccessToken] = useState<
    AuthContextProps['accessToken']
  >(getAccessToken());
  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
  const logIn = useCallback((redirectTo: string) => {
    console.log('dangnhap');
  }, []);
  const logOut = useCallback(() => {}, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
