const { Router } = require("express");
const profileController = require("../controllers/profiles");

const profileRouter = Router();

profileRouter.get("/", profileController.index);
profileRouter.get("/:id", profileController.show);
profileRouter.get("/token/:token", profileController.token)
profileRouter.post("/register", profileController.register);
profileRouter.post("/login", profileController.login);
profileRouter.patch("/:id", profileController.update);
profileRouter.delete("/:id", profileController.destroy);
profileRouter.delete("/token/:token", profileController.logout)

module.exports = profileRouter;