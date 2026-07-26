import { Navigate, Outlet, useLocation } from "react-router-dom";
import { IsAuthenticated, GetCurrentUser } from "../../../services/AuthService";

/**
 * Blocks access to nested routes unless the user has a valid session.
 * Redirects to /login and remembers where they were headed so Login
 * can send them back after a successful sign-in.
 */
export const RequireAuth = () => {
  const location = useLocation();

  if (!IsAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

/**
 * Blocks access to nested routes unless the user is authenticated
 * AND has the "admin" role. A logged-in non-admin is bounced to the
 * storefront home instead of /login, since they *are* authenticated —
 * they just don't have permission.
 */
export const RequireAdmin = () => {
  const location = useLocation();

  if (!IsAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const user = GetCurrentUser();
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
