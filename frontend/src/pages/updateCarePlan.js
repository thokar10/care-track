import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./AddResident.css";
import DefaultLayout from "../layout/DefaultLayout";
import { message } from "antd";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useUser } from "./UserContext";

const UpdateCarePlan = () => {
  const { user, setUser, setRole, role } = useUser();
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    carePlan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/residents/${id}`, formData);
      message.success("Resident updated successfully!");
      navigate("/CarePlan");
    } catch (error) {
      console.error(error);
      message.error("Failed to update staff.");
    }
  };

  const fetchStaffData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/residents/${id}`
      );
      console.log(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch resident data.");
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  return (
    <DefaultLayout>
      <div
        className="add-resident-container"
        style={{ width: "70%", padding: "20px" }}
      >
        <span
          className="w-[10%]   text-5xl text-red-500 "
          onClick={() => {
            navigate("/residents");
          }}
        >
          <IoArrowBackCircleSharp className="hover:cursor-pointer hover:scale-110" />
        </span>
        <h1 className="text-gray-600 font-bold text-center">
          Update Care Plan
        </h1>

        <form onSubmit={handleSubmit} className="add-resident-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              disabled
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Care Plan:</label>
            <textarea
              name="carePlan"
              value={formData.carePlan}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Update Care Plan
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default UpdateCarePlan;
