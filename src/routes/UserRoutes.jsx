import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/user/Home";
import NotFound from "../pages/common/NotFound";
import Portfolio from "@/pages/user/Portfolio";
import About from "@/pages/user/About";
import Contact from "@/pages/user/Contact";
import Services from "@/pages/user/Services";

const UserRoutes = () => {
  return (
    <React.Fragment>
      <Route index element={<Home />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="services" element={<Services />} />
      <Route path="*" element={<NotFound role='user' />} />
    </React.Fragment>
  );
};

export default UserRoutes;
