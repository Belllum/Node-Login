const express = require("express");
const router = express.Router();
const {
  getUsers,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.get("/getUsers", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);

module.exports = router;
