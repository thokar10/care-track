import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Residents from "./pages/Residents";
import { UserProvider } from "./pages/UserContext";
import Staffs from "./pages/Staff";
import Medication from "./pages/Medication";
import Scheduling from "./pages/Scheduling";
import CarePlan from "./pages/CarePlan";
import AddStaff from "./pages/AddStaff";

import AddResident from "./pages/AddResident";
import AddSchedule from "./pages/AddSchedule";
import EditResident from "./pages/EditResident";
import AddMedication from "./pages/AddMedication";
import ResidentDetails from "./pages/ResidentDetails";
import UpdateCarePlan from "./pages/updateCarePlan";
import StaffDetails from "./pages/StaffDetails";
import LoginPage from "./pages/LoginPage";
// include bootstrap css
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import Dashboard from "./pages/Dashboard";
import EditStaff from "./pages/EditStaff";
import AddCarePlan from "./pages/addCarePlan";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app-container">
          <header className="app-header">
            <h1>Care Track</h1>
          </header>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/staffs" element={<Staffs />} />
            <Route path="/medications" element={<Medication />} />s
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/CarePlan" element={<CarePlan />} />
            <Route path="/add-CarePlan" element={<AddCarePlan />} />
            <Route path="/add-staff" element={<AddStaff />} />
            <Route path="/edit-staff" element={<EditStaff />} />
            <Route path="/update-carePlan/:id" element={<UpdateCarePlan />} />
            <Route path="/edit-resident/:id" element={<EditResident />} />
            <Route path="/add-resident" element={<AddResident />} />
            <Route path="/add-schedule" element={<AddSchedule />} />
            <Route path="/add-medication" element={<AddMedication />} />
            <Route path="/staff/:id" element={<StaffDetails />} />
            <Route path="/residents/:id" element={<ResidentDetails />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
