import { useContext } from "react";
import AuthContext from "../contexts/auth/AuthContext";

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
