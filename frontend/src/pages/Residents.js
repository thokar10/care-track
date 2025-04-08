import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { message } from "antd";
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useUser } from "./UserContext";

const Residents = () => {
  const { user, setUser, setRole, role } = useUser();
  const [residents, setResidents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/residents")
      .then((response) => setResidents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/residents/${id}`);
      setResidents(residents.filter((resident) => resident._id !== id));
      message.success("Resident deleted successfully!");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to delete resident.");
    }
  };

  if (!residents) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div className="residents-container">
        <h1 className="text-gray-600 font-bold text-center">Residents</h1>

        <Link to="/add-resident" className="add-resident-link hover:scale-105 ">
          Add New Resident
        </Link>
        <ul>
          {residents.map((resident) => (
            <li
              key={resident._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <p className="text-gray-700 font-semibold">
                  {" "}
                  {resident.name} - Room {resident.roomNumber}
                </p>
              </div>

              <div>
                <button
                  onClick={() => {
                    navigate(`/residents/${resident._id}`);
                  }}
                  className="btn btn-info hover:scale-105"
                  style={{ marginLeft: "15px" }}
                >
                  <div className="flex items-center gap-2">
                    <FaEye /> View
                  </div>
                </button>
                <button
                  onClick={() => {
                    navigate(`/edit-resident/${resident._id}`);
                  }}
                  className="btn btn-primary hover:scale-105"
                  style={{ marginLeft: "15px" }}
                >
                  <div className="flex items-center gap-2">
                    <MdModeEdit /> Edit
                  </div>
                </button>
                <button
                  onClick={() => handleDelete(resident._id)}
                  className="btn btn-danger hover:scale-105"
                  style={{ marginLeft: "15px" }}
                >
                  <div className="flex items-center gap-2">
                    <MdDelete /> Delete
                  </div>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DefaultLayout>
  );
};

export default Residents;
