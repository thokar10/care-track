import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import "../pages/ResidentDetails.css";
import { message } from "antd";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useUser } from "./UserContext";

const StaffDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/staff/${id}`)
      .then((response) => setStaff(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div
        className="add-resident-container"
        style={{ width: "70%", padding: "20px" }}
      >
        <div className="flex ">
          {" "}
          <span
            className="w-[10%]   text-5xl text-red-500 "
            onClick={() => {
              navigate("/staffs");
            }}
          >
            <IoArrowBackCircleSharp className="hover:cursor-pointer hover:scale-110" />
          </span>
          <h1 className="text-white font-bold mt-2 w-[80%] bg-slate-500 p-3 text-center">
            {" "}
            Details of {staff.name}
          </h1>
        </div>

        <p className="text-red-400 font-semibold">
          Email:{" "}
          <span style={{ fontWeight: 600, color: "#64748b" }}>
            {staff.email}
          </span>
        </p>
        <p className="text-red-400 font-semibold">
          Role:{" "}
          <span style={{ fontWeight: 600, color: "#64748b" }}>
            {staff.role}
          </span>
        </p>
        <p className="text-red-400 font-semibold">
          Contact:{" "}
          <span style={{ fontWeight: 600, color: "#64748b" }}>
            {staff.contact}
          </span>
        </p>

        <p className="text-red-400 font-semibold">Shifts:</p>
        <ul>
          {staff.shifts.length > 0 ? (
            staff.shifts.map((shift, index) => (
              <li key={index}>
                <p style={{ fontWeight: 600, color: "#64748b" }}>
                  {shift.shift} - ({shift.startTime} to {shift.endTime})
                </p>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No shifts assigned.</li>
          )}
        </ul>

        <p className="text-red-400 font-semibold">Certifications:</p>
        <ul>
          {staff.certifications.length > 0 ? (
            staff.certifications.map((cert, index) => (
              <li key={index}>
                <p style={{ fontWeight: 600, color: "#64748b" }}>
                  {cert.name} - Expiry: {cert.expiryDate.slice(0, 10)}
                </p>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No certifications available.</li>
          )}
        </ul>
      </div>
    </DefaultLayout>
  );
};

export default StaffDetails;
