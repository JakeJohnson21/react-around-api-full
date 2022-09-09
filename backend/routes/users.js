const router = require("express").Router();
const {
  validateUserBody,
  validateAvatar,
  validateProfile,
} = require("../middlewares/validation");
const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

router.patch("/me", validateProfile, updateUser);
router.patch("/me/avatar", validateAvatar, updateAvatar);
router.get("/", validateUserBody, getUsers);
router.get("/me", getUser);
router.get("/:_id", validateUserBody, getCurrentUser);

module.exports = router;
