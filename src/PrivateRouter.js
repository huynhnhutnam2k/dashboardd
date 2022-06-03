import React from "react";

import {  Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRouter({ element: Component, ...rest }) {
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;
  console.log(Element)
  return (
    // <Route
    //   {...rest}
    //   element={(props) => {
    //     // if (userInfo?.isAdmin) {
    //     //   return <Component {...props} />;
    //     // } else {
    //     //   return <Redirect to={"/login"} />;
    //     // }
    //     return <Component {...props} />;
    //   }}
    // />
    <p>dsa</p>
  )
}
