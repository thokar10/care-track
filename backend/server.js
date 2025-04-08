const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const residentRoutes = require("./routes/residentRoutes");
const staffRoutes = require("./routes/staffRoutes");
const billingRoutes = require("./routes/billingRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const shiftRoutes = require("./routes/shiftRoutes");
const taskRoutes = require("./routes/taskRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const carePlanRoutes = require("./routes/carePlanRoutes");
const staffController = require("./controllers/staffController");
const Auth_id = require("./middleware/authenthication");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/staff/login", staffController.loginStaff);
app.use("/api/residents", residentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/CarePlan", carePlanRoutes);
app.use("/api/medication", medicationRoutes);
app.use("/api/shift", shiftRoutes);
app.use("/api/ai", aiRoutes);

app.use(Auth_id);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`CareTrack backend running on port ${PORT}`)
);
