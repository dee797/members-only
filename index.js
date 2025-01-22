
require('dotenv').config();
const path = require("node:path");
const express = require("express");
const app = express();
const newMessageRouter = require("./routes/newMessageRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

async function getMessageById(messageId, messages) {
  return messages.find(message => message.id == messageId);
};

app.locals.messages = messages;
app.use(express.urlencoded({ extended: true }));



app.use("/new", newMessageRouter);

app.get('/', (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: app.locals.messages});
});

app.get("/:id", async (req, res) => {
  try {
    const message = await getMessageById(req.params.id, app.locals.messages);

    if (!message) {
      res.status(404).render("error");
      return;
    }

    res.render("message", {message: message});

  } catch (err) {
    console.error(err);
    res.status(505).send("Internal Server Error");
  }
});

app.use((req, res, next) => {
    res.status(404);
    res.render("error");
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT);
