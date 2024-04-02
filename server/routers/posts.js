const { Router } = require("express");
const postController = require("../controllers/posts");

const postRouter = Router();

postRouter.get("/", postController.index);
postRouter.get("/:id", postController.show);
postRouter.get("/user/:id", postController.showAll)
postRouter.post("/", postController.create);
postRouter.patch("/:id", postController.update);
postRouter.delete("/:id", postController.destroy);

module.exports = postRouter;