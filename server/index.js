const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose
  .connect("mongodb://localhost:27017/cruddb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* Schema */
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String
});

const User = mongoose.model("User", userSchema);

/* GET USERS */
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* ADD USER */
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User added successfully" });
});

/* DELETE USER */
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  const users = await User.find();
  res.json(users);
});

/* UPDATE USER */
app.patch("/users/:id", async (req, res) => {
  const id = req.params.id;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  res.json(updatedUser);
});

/* SERVER */
app.listen(8000, () => {
  console.log("Server running on port 8000");
});