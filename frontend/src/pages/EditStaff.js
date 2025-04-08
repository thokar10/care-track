import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddResident.css";
import DefaultLayout from "../layout/DefaultLayout";
import { message } from "antd";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useUser } from "./UserContext";

const EditStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedData = location.state;
  const id = passedData;

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/staff/${id}`, formData);
      message.success("Staff updated successfully!");
      navigate("/staffs");
    } catch (error) {
      console.error(error);
      message.error("Failed to update staff.");
    }
  };

  const getShiftDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/shift/");
      setShiftDetails(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch shift.");
    }
  };

  const getTaskDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/task/get");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch Task.");
    }
  };

  const fetchStaffData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/staff/${id}`);
      console.log(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch staff data.");
    }
  };

  useEffect(() => {
    getShiftDetails();
    getTaskDetails();
    fetchStaffData();
  }, [id]);

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
        <h1 className="text-gray-600 font-bold text-center">Edit Staff</h1>

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
            </select>
          </div>

          <div className="form-group">
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
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

          <div className="form-group">
            <label>Certifications:</label>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="emergency-contact-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={cert.name}
                  onChange={(e) => {
                    const updated = [...formData.certifications];
                    updated[index].name = e.target.value;
                    setFormData({ ...formData, certifications: updated });
                  }}
                />
                <input
                  type="date"
                  value={cert.expiryDate ? cert.expiryDate.slice(0, 10) : ""}
                  onChange={(e) => {
                    const updated = [...formData.certifications];
                    updated[index].expiryDate = e.target.value;
                    setFormData({ ...formData, certifications: updated });
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
            Update Staff
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditStaff;
