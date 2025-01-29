const { Router } = require("express");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const indexRouter = Router();

indexRouter.get("/", asyncHandler(async (req, res) => {
    const messages = await db.getAllMessages();
    res.render("index", { user: res.locals.currentUser, messages: messages });
}));

module.exports = indexRouter;
