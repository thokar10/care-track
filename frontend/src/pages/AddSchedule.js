import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddResident.css"; // Import the CSS file
import DefaultLayout from "../layout/DefaultLayout";
import { message } from "antd";
import { Color } from "antd/es/color-picker";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useUser } from "./UserContext";

const AddSchedule = () => {
  const { user, setUser, setRole, role } = useUser();
  const [formData, setFormData] = useState({
    residentId: "",
    taskTitle: "",
    staffId: "",
    dateTime: "",
    RoomNo: "",
  });

  const [residentDetails, setResidentDetails] = useState([]);
  const [staffDetails, setStaffDetails] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      console.log(formData);
      await axios.post("http://localhost:5000/api/task/add", formData);
      message.success("Task added successfully!");
      navigate("/scheduling");
    } catch (error) {
      console.error(error);
      message.error("Failed to add Task.");
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

  const getStaffInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/staff/");
      console.log(response.data);
      setStaffDetails(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch staff.");
    }
  };

  useEffect(() => {
    getResidentInfo();
    getStaffInfo();
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
        <h1 className="text-gray-600 font-bold text-center">Add Task</h1>
        <form onSubmit={handleSubmit} className="add-resident-form">
          <div className="form-group">
            <label>ResidentID:</label>
            <select
              name="residentId"
              value={formData.residentId}
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
            <label>staffID:</label>
            <select
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Select staff
              </option>
              {staffDetails
                .filter((staffDetail) => {
                  const nameLower = staffDetail.name.toLowerCase();
                  return (
                    !nameLower.startsWith("admin") &&
                    !nameLower.startsWith("doctor") &&
                    !nameLower.startsWith("nurse") &&
                    !nameLower.startsWith("care giver") &&
                    !nameLower.startsWith("manager")
                  );
                })
                .map((staffDetail, index) => (
                  <option key={index} value={staffDetail._id}>
                    {staffDetail.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Task Description:</label>
            <textarea
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date and Time:</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Add Task
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddSchedule;
