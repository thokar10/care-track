import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddResident.css"; // Import the CSS file
import DefaultLayout from "../layout/DefaultLayout";
import { message } from "antd";

import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useUser } from "./UserContext";

const AddResident = () => {
  const { user, setUser, setRole, role } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    roomNumber: "",
    medicalHistory: "",
    allergies: "",
    dietaryRestrictions: "",
    emergencyContacts: [{ name: "", phone: "", relationship: "" }],
    carePlan: "",
    photo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/residents", formData);
      message.success("Resident added successfully!");
      navigate("/residents");
    } catch (error) {
      console.error(error);
      message.error("Failed to add resident.");
    }
  };

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
        <h1 className="text-gray-600 font-bold text-center">Add Resident</h1>
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
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Room Number:</label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Medical History:</label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Allergies:</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Dietary Restrictions:</label>
            <input
              type="text"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Emergency Contacts:</label>
            {formData.emergencyContacts.map((contact, index) => (
              <div key={index} className="emergency-contact-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={contact.name}
                  onChange={(e) => {
                    const newContacts = [...formData.emergencyContacts];
                    newContacts[index].name = e.target.value;
                    setFormData({
                      ...formData,
                      emergencyContacts: newContacts,
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={contact.phone}
                  onChange={(e) => {
                    const newContacts = [...formData.emergencyContacts];
                    newContacts[index].phone = e.target.value;
                    setFormData({
                      ...formData,
                      emergencyContacts: newContacts,
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="Relationship"
                  value={contact.relationship}
                  onChange={(e) => {
                    const newContacts = [...formData.emergencyContacts];
                    newContacts[index].relationship = e.target.value;
                    setFormData({
                      ...formData,
                      emergencyContacts: newContacts,
                    });
                  }}
                />
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>Care Plan:</label>
            <textarea
              name="carePlan"
              value={formData.carePlan}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Photo URL:</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Add Resident
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddResident;
