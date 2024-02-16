import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";

export default createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </>
  )
);
