import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./DashboardUser.css";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import {
  setUsername,
  setRole,
  setState,
  selectUsername,
  selectRole,
} from "../../redux/slices/userSlice";
import NotFound from "../notFound/NotFound";
import Users from "../users/Users";
import Doctors from "../doctors/Doctors";
import Pharmaciens from "../pharmaciens/Pharmaciens";
import AddUser from "../addUser/AddUser";
import Logo from "../../assets/People-Patient-Male-icon.png";
import MesConsultations from "../mesconsultations/MesConsultations";
export default function DashboardUser() {
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();
  const history = useHistory();
  const [selected, setSelected] = useState(null);
  useEffect(() => {}, []);

  const signout = () => {
    window.sessionStorage.removeItem("id_token");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("role");
    window.sessionStorage.removeItem("expires");
    window.location.reload();
  };

  return (
    <div className="dashboardUserContainer">
      <div className="dashboardUserSidebar">
        <div className="dashboardUserLogoNameContainer">
          <div
            className="dashboardUserProjet"
            onClick={() => {
              history.push("/");
            }}
          >
            Sbitarna
          </div>
          <img className="dashboardUserLogo" src={Logo}></img>
          <div className="dashboardUserUsername">{username}</div>
        </div>
        <div className="dashboardUserMenus">
          <ul>
            <li
              className={selected == 0 ? "dashboardUserMenuSelected" : ""}
              onClick={() => {
                setSelected(0);
              }}
            >
              <Link className="dashboardUserLink" to="/reserver">
                <i className="fas fa-calendar-plus"></i>
                Réserver
              </Link>
            </li>
            <li
              className={selected == 1 ? "dashboardUserMenuSelected" : ""}
              onClick={() => {
                setSelected(1);
              }}
            >
              <Link className="dashboardUserLink" to="/mesconsultations">
                <i className="fas fa-user-clock"></i>
                Mes Consultations
              </Link>
            </li>
          </ul>
        </div>
        <div className="dashboardUserLogout" onClick={signout}>
          <i className="fas fa-sign-out-alt"></i>
          Deconnexion
        </div>
      </div>
      <div className="dashboardUserContent">
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/reserver">
            <Doctors />
          </Route>
          <Route exact path="/mesconsultations">
            <MesConsultations />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
