import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useUser } from "./UserContext";

const CarePlan = () => {
  const { user, setUser, setRole, role } = useUser();
  const navigate = useNavigate();
  const [residents, setResidentPlan] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/residents/")
      .then((response) => setResidentPlan(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/resident/${id}`);
      setResidentPlan(residents.filter((med) => med._id !== id));
      message.success("CarePlan deleted successfully!");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to delete medication.");
    }
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!residents) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div className="residents-container">
        <h1 className="text-gray-600 font-bold text-center">Care Plans</h1>

        <table className="medications-table">
          <thead>
            <tr>
              <th>Resident Name and Room</th>
              <th>Medical History</th>
              <th>Allergies</th>
              <th>CarePlan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((med) => (
              <tr key={med._id}>
                <td>
                  {med.name} {med.roomNumber}
                </td>
                <td>{med.medicalHistory}</td>
                <td>{med.allergies.join(", ")}</td>
                <td>{med.carePlan}</td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 15,
                    padding: "20px",
                  }}
                >
                  <button
                    onClick={() => {
                      navigate(`/update-carePlan/${med._id}`);
                    }}
                    className="btn btn-primary hover:scale-105"
                    style={{ marginLeft: "15px" }}
                  >
                    <div className="flex items-center gap-2">
                      <MdModeEdit /> Edit
                    </div>
                  </button>

                  <button
                    onClick={() => handleDelete(med._id)}
                    className="btn btn-danger hover:scale-105"
                    style={{ marginLeft: "15px" }}
                  >
                    <div className="flex items-center gap-2">
                      <MdDelete /> delete
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default CarePlan;
