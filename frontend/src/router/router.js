import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../pages/Home'; 
import Test from '../pages/Test';

const CustomRouter = () => {
  return (
    <Router>
        <Route path="/" component={Home} />
        <Route path="/test" component={Test} /> 
    </Router>
  );
};

export default CustomRouter;
