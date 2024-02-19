import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const PROTECTED_ROUTES = [{ path: "/", element: <App /> }].map(
  ({ path, element }) => ({
    path,
    element: <ProtectedRoute auth>{element}</ProtectedRoute>,
  })
);

const UNPROTECTED_ROUTES = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
].map(({ path, element }) => ({
  path,
  element: <ProtectedRoute>{element}</ProtectedRoute>,
}));

export default createBrowserRouter(
  createRoutesFromElements(
    [...PROTECTED_ROUTES, ...UNPROTECTED_ROUTES].map((r, i) => (
      <Route key={i} {...r} />
    ))
  )
);
