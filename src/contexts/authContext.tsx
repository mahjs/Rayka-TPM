import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
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
  logout: () => {}
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(
    !!storage.get(config.tokenName)
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(storage.get(config.isAdmin));

  useEffect(() => {
    setIsAdmin(storage.get(config.isAdmin));
  }, [isLogin]);

  const sendLogoutLog = async (username: string) => {
    try {
      const logData = {
        name: username,
        activity: "خروج از حساب کاربری",
        description: `خروج کاربر با نام کاربری ${username} از سیستم`
      };

      await fetch("http://185.11.89.120:51731/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(logData)
      });
    } catch (error) {
      console.error("Error sending logout log:", error);
    }
  };

  const login = () => {
    setIsLogin(true);
    setTimeout(() => {
      logout();
    }, 604800000);
  };

  const logout = async () => {
    // Get the username from storage
    const username = storage.get(config.userName) as string;
    if (username) {
      // Send logout log
      await sendLogoutLog(username);
    }
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
