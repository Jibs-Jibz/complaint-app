import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Admin from "./pages/Admin";
import PageNotFound from "./pages/PageNotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Student from "./pages/Student";
import SuperAdmin from "./pages/Superadmin/SuperAdmin";


function App() {
  return (
    <Router>
      <BackgroundWrapper>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/student" element={<Student />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/superadmin" element={<SuperAdmin />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BackgroundWrapper>
    </Router>
  );
}

export default App;
