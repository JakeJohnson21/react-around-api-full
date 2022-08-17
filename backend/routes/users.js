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

router.get("/", validateUserBody, getUsers);
router.get("/:_id", validateUserBody, getUser);
router.get("/me", getCurrentUser);
router.patch("me", validateProfile, updateUser);
router.patch("/me/avatar", validateAvatar, updateAvatar);

module.exports = router;
