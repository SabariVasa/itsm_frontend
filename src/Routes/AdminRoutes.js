import React from 'react';
// import Signin from '../Pages/Signin';
// import Signup from '../Pages/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PartnerVerifyPage from '../Pages/PartnerVerifyPage';


export default function AdminRoutes(props) {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AuthenticatedRoute" element={<PartnerVerifyPage />} />
      </Routes>
    </BrowserRouter>
  )
}
