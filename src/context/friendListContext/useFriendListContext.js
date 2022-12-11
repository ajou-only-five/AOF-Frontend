import { useContext } from "react";
import FriendListContext from "./friendListContext";

const useFriendListContext = () => useContext(FriendListContext);

export default useFriendListContext;
