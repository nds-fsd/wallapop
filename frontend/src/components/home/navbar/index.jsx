import React from "react";
import { getUserToken } from "../../../utils/localStorage.utils";
import Login from "../LOGIN";
import Logout from "../LOGOUT/index";

const Navbar=() => {
    const token = getUserToken();

    return (
        
        <div>
            {token ? <Login/> : <Logout /> }
           
         </div>
        
  )};
  export default Navbar

  {/* <CreateUserPage />
<LoginPage />
<UserPage />
<ProductPage />
{/* <ModalContainer />  */}

{/* <ListProducts />
<Postproform />
<Map /> */}