import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import storage from "../services/storage";
import config from "../services/config";

interface AuthContextType {
  isLogin: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(
    !!storage.get(config.tokenName)
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(storage.get(config.isAdmin));

  const login = () => {
    setIsLogin(true);
  };
  const logout = () => {
    storage.remove(config.tokenName);
    storage.remove(config.isAdmin);
    storage.remove(config.userName);
    setIsLogin(false);
  };
  return (
    <AuthContext.Provider value={{ isLogin, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
