import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RedirectUser() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  
  return null;
}
