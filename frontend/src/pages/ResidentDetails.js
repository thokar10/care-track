import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import "../pages/ResidentDetails.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useUser } from "./UserContext";

const ResidentDetails = () => {
  const { user, setUser, setRole, role } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [resident, setResident] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/residents/${id}`)
      .then((response) => setResident(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!resident) {
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
              navigate("/residents");
            }}
          >
            <IoArrowBackCircleSharp className="hover:cursor-pointer hover:scale-110" />
          </span>
          <h1 className="text-white font-bold mt-2 w-[80%] bg-slate-500 p-3 text-center">
            {" "}
            Details of {resident.name}
          </h1>
        </div>

        <p className="text-red-400 font-semibold">
          Age: <span className="text-gray-600">{resident.age}</span>
        </p>
        <p className="text-red-400 font-semibold">
          Gender: <span className="text-gray-600">{resident.gender}</span>
        </p>
        <p className="text-red-400 font-semibold">
          Room Number:{" "}
          <span className="text-gray-600">{resident.roomNumber}</span>
        </p>
        <p className="text-red-400 font-semibold">
          Medical History:
          <span className="text-gray-600"> {resident.medicalHistory}</span>{" "}
        </p>
        <p className="text-red-400 font-semibold">
          Allergies:{" "}
          <span className="text-gray-600">{resident.allergies.join(", ")}</span>
        </p>
        <p className="text-red-400 font-semibold">
          Dietary Restrictions:{" "}
          <span className="text-gray-600">
            {resident.dietaryRestrictions.join(", ")}
          </span>
        </p>
        <p className="text-red-400 font-semibold">Emergency Contacts:</p>
        <ul>
          {resident.emergencyContacts.map((contact, index) => (
            <li key={index}>
              <p style={{ fontWeight: 600, color: "#64748b" }}>
                {contact.name} - {contact.phone} ({contact.relationship})
              </p>
            </li>
          ))}
        </ul>
        <p className="text-red-400 font-semibold">
          Care Plan: <span className="text-gray-600">{resident.carePlan}</span>
        </p>
        <img
          src={resident.photo}
          alt={resident.name}
          style={{ width: "200px" }}
        />
      </div>
    </DefaultLayout>
  );
};

export default ResidentDetails;
