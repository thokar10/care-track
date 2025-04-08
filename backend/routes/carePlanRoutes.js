const express = require("express");
const router = express.Router();
const carePlanController = require("../controllers/carePlanController");

// add care plan
router.post("/", carePlanController.addCarePlan);

//get care plan by id
router.get("/:id", carePlanController.getCarePlanById);

//delete care plan by id
router.delete("/:id", carePlanController.deleteCarePlanByID);

//get all care plan
router.get("/", carePlanController.getCarePlan);

module.exports = router;
