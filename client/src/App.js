import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Nav from "./components/nav";
import Signup from "./components/signup";
import Login from "./components/login";
import Report from './components/report';
import PrivateComponent from './components/privateComponent'

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/viewreport" element={<Report />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
