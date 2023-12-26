import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import storage from "../services/storage";
import config from "../services/config";
import { useNavigate } from "react-router-dom";

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
  const [isLogin, setIsLogin] = useState<boolean>(
    !!storage.get(config.tokenName)
  );

  const login = () => {
    setIsLogin(true);
  };
  const logout = () => {
    storage.remove(config.tokenName);
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
