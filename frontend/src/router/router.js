import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../pages/Home'; 

const CustomRouter = () => {
  return (
    <Router>
        <Route path="/cctv-ping" component={Home} />
    </Router>
  );
};

export default CustomRouter;
