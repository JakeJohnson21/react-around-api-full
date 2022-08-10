const router = require("express").Router();
const { validateUserBody } = require("../middlewares/validation");
const {
  getUsers,
  getUsersById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

router.get("/users", validateUserBody, getUsers);
router.get("/users/:_id", validateUserBody, getUsersById);
router.get("/users/me", validateUserBody, getCurrentUser);
router.patch("/users/me", validateUserBody, updateUser);
router.patch("/users/me/avatar", validateUserBody, updateAvatar);

module.exports = router;
