const { Router } = require("express");
const commentController = require("../controllers/comments");

const commentRouter = Router();

commentRouter.get("/", commentController.index);
commentRouter.get("/:id", commentController.show);
commentRouter.get("/user/:id", commentController.showAllByUser)
commentRouter.get("/post/:id", commentController.showAllByPost)
commentRouter.post("/", commentController.create);
commentRouter.patch("/:id", commentController.update);
commentRouter.delete("/:id", commentController.destroy);

module.exports = commentRouter;