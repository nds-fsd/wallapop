import React, { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import Login from "../LOGIN";
import Logout from "../LOGOUT/index";

const Navbar = () => {
  const { userData } = useContext(AuthContext);

   return <div> {userData ? <Login /> : <Logout />} </div>;
};
export default Navbar;
