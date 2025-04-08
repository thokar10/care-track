import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddResident.css";
import DefaultLayout from "../layout/DefaultLayout";
import { message } from "antd";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useUser } from "./UserContext";

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    contact: "",
    shifts: [],
    certifications: [{ name: "", expiryDate: "" }],
  });

  const [shiftDetails, setShiftDetails] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/staff/", formData);
      message.success("staff added successfully!");
      navigate("/staffs");
    } catch (error) {
      console.error(error);
      message.error("Failed to add resident.");
    }
  };

  const getShiftDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/shift/");
      console.log(response.data);
      setShiftDetails(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch shift.");
    }
  };

  const getTaskDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/task/get");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch Task.");
    }
  };

  useEffect(() => {
    getShiftDetails();
    getTaskDetails();
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
            navigate("/staffs");
          }}
        >
          <IoArrowBackCircleSharp className="hover:cursor-pointer hover:scale-110" />
        </span>
        <h1 className="text-gray-600 font-bold text-center">Add Staff</h1>

        <form onSubmit={handleSubmit} className="add-resident-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="" disabled>
                Select a role
              </option>
              <option value="nurse">Nurse</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="doctor">Doctor</option>
              <option value="care-giver">Care Giver</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="form-group">
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.medicalHistory}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Shifts:</label>
            <select
              name="shifts"
              value={formData.shifts}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Select shift for staff
              </option>
              {shiftDetails.map((shiftDetail, index) => (
                <option key={index} value={shiftDetail._id}>
                  {shiftDetail.shift} ({shiftDetail.startTime} to{" "}
                  {shiftDetail.endTime})
                </option>
              ))}
            </select>
          </div>

          {/* <div className="form-group">
            <label>Task:</label>

            <select name="tasks" value={formData.tasks} onChange={handleChange}>
              <option value="" disabled selected>
                Select task for staff
              </option>
              {taskDetails.map((taskDetail, index) => (
                <option key={index} value={taskDetail._id}>
                  {taskDetail.title}
                </option>
              ))}
            </select>
          </div> */}

          <div className="form-group">
            <label>Certifications:</label>
            {formData.certifications.map((certifications, index) => (
              <div key={index} className="emergency-contact-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={certifications.name}
                  onChange={(e) => {
                    const newCertification = [...formData.certifications];
                    newCertification[index].name = e.target.value;
                    setFormData({
                      ...formData,
                      certifications: newCertification,
                    });
                  }}
                />
                <input
                  type="date"
                  placeholder="expiryDate"
                  value={certifications.expiryDate}
                  onChange={(e) => {
                    const newCertification = [...formData.certifications];
                    newCertification[index].expiryDate = e.target.value;
                    setFormData({
                      ...formData,
                      certifications: newCertification,
                    });
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  certifications: [
                    ...formData.certifications,
                    { name: "", expiryDate: "" },
                  ],
                });
              }}
              className="btn btn-info"
            >
              + Add Another Certification
            </button>
          </div>

          <button type="submit" className="submit-button">
            Add Staff
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddStaff;
