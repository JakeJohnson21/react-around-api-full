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
router.get("/:_id", validateUserBody, getUser);
router.patch("/me/avatar", validateAvatar, updateAvatar);
router.get("/", getUsers);
router.get("/me", getCurrentUser);

module.exports = router;
