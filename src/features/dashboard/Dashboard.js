import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsername,
  setRole,
  setState,
  selectUsername,
  selectRole,
} from "../../redux/slices/userSlice";
import DashboardAdmin from "../dashboardAdmin/DashboardAdmin";
import DashboardUser from "../dashboardUser/DashboardUser";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const role = useSelector(selectRole);
  useEffect(() => {
    if (!window.sessionStorage.getItem("id_token")) {
      history.push("/login");
    } else {
      setTimeout(() => {
        window.sessionStorage.removeItem("id_token");
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("role");
        window.sessionStorage.removeItem("expires");
        window.location.reload();
      }, window.sessionStorage.getItem("expires"));
      dispatch(setUsername(window.sessionStorage.getItem("username")));
      dispatch(setRole(window.sessionStorage.getItem("role")));
      setLoading(false);
    }
  }, []);

  const signout = () => {
    window.sessionStorage.removeItem("id_token");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("role");
    window.sessionStorage.removeItem("expires");
    window.location.reload();
  };

  return (
    <div className="dashboardContainer">
      {loading ? (
        <Loading color="white" />
      ) : role == "a" ? (
        <DashboardAdmin />
      ) : (
        <DashboardUser />
      )}
    </div>
  );
}
