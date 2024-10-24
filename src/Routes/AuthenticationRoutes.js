// import React, { createContext, useState } from 'react';
// import Signin from '../Pages/Signin';
// import Signup from '../Pages/Signup';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PartnerVerifyPage from '../Pages/PartnerVerifyPage';
// import ForgetPassword from '../Pages/ForgetPassword';
// import ResetPassword from '../Pages/ResetPassword';
// import NewPasswordPage from '../Pages/NewPasswordPage';

// export const authContext = createContext(null);

// export default function AuthenticationRoutes(props) {
//   const [mailAddress, setMailAddress] = useState("");
//   return (
//     <BrowserRouter>
//       <authContext.Provider value={{ mailAddress, setMailAddress }}>
//         <Routes>
//           <Route path="/" element={<Signin handleRequest={props.handleRedirect} />} />
//           <Route path="/Signup" element={<Signup />} />
//           <Route path="/Verify-Partner" element={<PartnerVerifyPage />} />
//           <Route path="/forget-password" element={<ForgetPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/new-password-page" element={<NewPasswordPage />} />
//         </Routes>
//       </authContext.Provider>
//     </BrowserRouter>
//   )
// }
