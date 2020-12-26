import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Pharmacie.css";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setHeaders,
  addRow,
  removeRow,
  setData,
  removeData,
  removeHeaders,
  setSelected,
  selectHeaders,
  selectData,
  selectSelected,
} from "../../redux/slices/tableViewSlice";
import TableView from "../tableView/TableView";

export default function Pharmacie() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const selectedUser = useSelector(selectSelected);
  const headers = [
    { name: "reference", flex: 2 },
    { name: "nom", flex: 2 },
    { name: "quantite", flex: 1 },
    { name: "dateExpiration", flex: 3 },
    { name: "prix", flex: 1 },
  ];
  useEffect(() => {
    axiosInstance
      .get("medicaments", {
        headers: {
          Authorization: window.sessionStorage.getItem("id_token"),
        },
      })
      .then((respone) => respone.data)
      .then((data) => {
        dispatch(setHeaders(headers));
        dispatch(setData(data));
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
    return () => {
      dispatch(removeData());
      dispatch(removeHeaders());
    };
  }, []);

  return loading ? (
    <div className="pharmacieContainer">
      <Loading color="#0e5686" />
    </div>
  ) : (
    <div className="pharmacieContainer">
      <div className="pharmacieTitle">Pharmacie</div>
      <div className="pharmacieTableContainer">
        <TableView />
      </div>
    </div>
  );
}
