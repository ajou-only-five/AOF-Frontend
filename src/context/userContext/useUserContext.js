import { useContext } from "react";
import UserContext from "./userContext";

const useUserContext = () => useContext(UserContext);

export default useUserContext;
