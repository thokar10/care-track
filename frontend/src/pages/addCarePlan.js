import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddResident.css"; // Import the CSS file
import DefaultLayout from "../layout/DefaultLayout";
import { message } from "antd";

import { IoArrowBackCircleSharp } from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
import { useUser } from "./UserContext";

const AddCarePlan = () => {
  const { user, setUser, setRole, role } = useUser();
  const [formData, setFormData] = useState({
    residentID: "",
    carePlan: "",
  });

  const [residentDetails, setResidentDetails] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await axios.post("http://localhost:5000/api/CarePlan/", formData);
      message.success("Care Plan added successfully!");
      navigate("/CarePlan");
    } catch (error) {
      console.error(error);
      message.error("Failed to add Care Plan.");
    }
  };

  const getResidentInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/residents/");
      console.log(response.data);
      setResidentDetails(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch residents.");
    }
  };

  useEffect(() => {
    getResidentInfo();
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
            navigate("/medications");
          }}
        >
          <IoArrowBackCircleSharp className="hover:cursor-pointer hover:scale-110" />
        </span>
        <h1 className="text-gray-600 font-bold text-center">Add Care Plan</h1>
        <form onSubmit={handleSubmit} className="add-resident-form">
          <div className="form-group">
            <label>ResidentID:</label>
            <select
              name="residentID"
              value={formData.residentID}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Select resident
              </option>
              {residentDetails.map((residentDetail, index) => (
                <option key={index} value={residentDetail._id}>
                  {residentDetail.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Care Plan:</label>
            <TextArea
              type="text"
              name="carePlan"
              value={formData.carePlan}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Add Care Plan
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddCarePlan;
