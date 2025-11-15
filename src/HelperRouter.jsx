import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export const HelperRouter = ({ children, type }) => {
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token && type === "Auth") {
      setIsCheck(true);
      navigate("/"); // redirect if no token
    } else {
      setIsCheck(false);
    }
  }, [navigate, type]);
  if (isCheck) {
    return null;
  }
  return <>{children}</>;
};
