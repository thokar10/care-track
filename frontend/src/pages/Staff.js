import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useUser } from "./UserContext";

const Staff = () => {
  const { user, setUser, setRole, role } = useUser();
  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/staff")
      .then((response) => setStaff(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/staff/${id}`);
      setStaff(staff.filter((resident) => resident._id !== id));
      message.success("staff deleted successfully!");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to delete staff.");
    }
  };

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div className="residents-container">
        <h1 className="text-gray-600 font-bold text-center">Staffs</h1>
        <Link to="/add-staff" className="add-resident-link hover:scale-105">
          Add New Staff
        </Link>
        <ul>
          {staff
            .filter((staffMember) => {
              const roleLower = staffMember.name.toLowerCase();
              return (
                !roleLower.includes("nurse") &&
                !roleLower.includes("doctor") &&
                !roleLower.includes("manager") &&
                !roleLower.includes("admin") &&
                !roleLower.includes("care giver")
              );
            })
            .map((staffMember) => (
              <li
                key={staffMember._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div>
                  {" "}
                  <p className="text-gray-700 font-semibold">
                    {staffMember.name} - {staffMember.role}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => {
                      navigate(`/staff/${staffMember._id}`);
                    }}
                    className="btn btn-info hover:scale-105"
                    style={{ marginLeft: "15px", width: "max" }}
                  >
                    <div className="flex items-center gap-2">
                      <FaEye /> View
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/edit-staff", { state: staffMember._id });
                    }}
                    className="btn btn-primary hover:scale-105"
                    style={{ marginLeft: "15px" }}
                  >
                    <div className="flex items-center gap-2">
                      <MdModeEdit /> Edit
                    </div>
                  </button>
                  <button
                    onClick={() => handleDelete(staffMember._id)}
                    className="btn btn-danger hover:scale-105"
                    style={{ marginLeft: "15px" }}
                  >
                    <div className="flex items-center gap-2">
                      <MdDelete /> delete
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

export default Staff;
