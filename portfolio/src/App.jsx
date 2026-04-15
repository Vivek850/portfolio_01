// ./src/App.js
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Skill from "./components/Skill";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./components/Login"; // 👈 import Login
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Message from "./components/message";
import UpdateProjects from "./components/updateProjects"; // 👈 import Admin
import UpdateSkills from "./components/updateSkills";
import ProtectedRoute from "./components/protectedRoute"; // 👈 import ProtectedRoute
import UpdateHome from "./components/UpdateHome";
import UpdateFooter from "./components/UpdateFooter";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Normal pages with Nav + Footer */}
        <Route
          path="/"
          element={
            <>
              <NavBar/>
      <div id="home"><Home /></div>
      <div id="skill"><Skill /></div>
      <div id="projects"><Projects /></div>
      <div id="contact"><Contact /></div>
              <Footer />
            </>
          }
        />

        {/* Standalone Login page */}
        <Route path="/login" element={<Login />} />
        {/* Admin page (optional) */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
          <Admin />
          </ProtectedRoute>}
          >
          {/* Default child route */}
          <Route index element={<Message />} />


          <Route path="message" element={<Message />} />
          
          <Route path="UpdateSkills" element={<UpdateSkills />} />
          <Route path="UpdateProjects" element={<UpdateProjects />} />
          <Route path="UpdateHome" element={<UpdateHome />} />
          <Route path="UpdateFooter" element={<UpdateFooter />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
