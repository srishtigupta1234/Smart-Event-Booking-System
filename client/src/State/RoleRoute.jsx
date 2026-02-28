import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * @param {ReactNode} children 
 * @param {string|string[]} roles
 */
const RoleRoute = ({ children, roles }) => {
  const { user } = useSelector((state) => state.auth);


  if (!user) return <Navigate to="/" replace />;


  const userRole = user.role.toUpperCase().replace("ROLE_", "");


  const allowedRoles = Array.isArray(roles)
    ? roles.map((r) => r.toUpperCase().replace("ROLE_", ""))
    : [roles.toUpperCase().replace("ROLE_", "")];


  if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />;


  return children;
};

export default RoleRoute;