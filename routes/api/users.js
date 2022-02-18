const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { auth, upload, ctrlWrapper, validation } = require("../../middlewares");
const { subscriptionJoiSchema } = require("../../models/user");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/:id/subscription",
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
