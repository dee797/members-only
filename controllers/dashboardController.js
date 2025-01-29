require("dotenv").config();
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");


// GET requests

const getDashboard = (req, res) => {
    res.render("dashboard", {
        username: res.locals.currentUser.username,
        member: res.locals.currentUser.member
    });
};

const getNewMessageForm = (req, res) => {
    res.render("messageForm");
}

const getMembershipForm = (req, res) => {
    if (res.locals.currentUser.member === true) {
        return res.render("membershipForm", {
            currentMember: "You are already a member."
        });
    }
    res.render("membershipForm");
}


// POST requests

const postNewMessageForm = asyncHandler(async (req, res) => {
    await db.addNewMessage(res.locals.currentUser.userid, req.body.message, req.body.title);
    res.redirect("/dashboard");
})

const postMembershipForm = asyncHandler(async (req, res) => {
    if (req.body.passcode !== process.env.MEMBER) {
        return res.status(400).render("membershipForm", {
            error: "Incorrect passcode."
        });
    }

    await db.updateUserMembership(res.locals.currentUser.userid);
    res.redirect("/dashboard");
})


module.exports = {
    getDashboard,
    getNewMessageForm,
    getMembershipForm,
    postNewMessageForm,
    postMembershipForm
}