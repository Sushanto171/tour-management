import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Verify() {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!state?.email) {
      navigate("/");
    }
    console.log(state.email);
  }, [navigate, state]);
  return <div>This is verify Component.</div>;
}
