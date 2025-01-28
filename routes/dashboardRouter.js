const { Router } = require("express");
const dashboardController = require("../controllers/dashboardController");
const { isAuthenticated } = require("../controllers/authenticateController");
const dashboardRouter = Router();


dashboardRouter.get("/", isAuthenticated, dashboardController.getDashboard);
dashboardRouter.get("/newMessage", isAuthenticated, dashboardController.getNewMessageForm);
dashboardRouter.post("/newMessage", isAuthenticated, dashboardController.postNewMessageForm);
dashboardRouter.get("/membership", isAuthenticated, dashboardController.getMembershipForm);
dashboardRouter.post("/membership", isAuthenticated, dashboardController.postMembershipForm);


module.exports = dashboardRouter;