import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

interface AuthContextType {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const login = () => {
    setIsLogin(true);
  };
  const logout = () => {
    setIsLogin(false);
  };
  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
