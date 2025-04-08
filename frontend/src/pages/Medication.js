import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import { Link } from "react-router-dom";
import { message } from "antd";
import { MdDelete } from "react-icons/md";
import { useUser } from "./UserContext";

const Staff = () => {
  const { user, setUser, setRole, role } = useUser();
  const [medication, setMedication] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/medication/")
      .then((response) => setMedication(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/medication/${id}`);
      setMedication(medication.filter((med) => med._id !== id));
      message.success("Medication deleted successfully!");
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

  if (!medication) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div className="residents-container">
        <h1 className="text-gray-600 font-bold text-center">Medications</h1>
        <Link
          to="/add-medication"
          className="add-resident-link hover:scale-105"
        >
          Add New Medication
        </Link>

        <table className="medications-table">
          <thead>
            <tr>
              <th>Resident Name and Room</th>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Instruction</th>
              <th>Time and Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medication.map((med) => (
              <tr key={med._id}>
                <td>
                  {med.residentId.name} {med.residentId.roomNumber}
                </td>
                <td>{med.name}</td>
                <td>{med.dosage}</td>
                <td>{med.instructions}</td>
                <td>{formatDateTime(med.time)}</td>
                <td>
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

export default Staff;
