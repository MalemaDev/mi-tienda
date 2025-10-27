import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js"; // ajusta la ruta según tu estructura

dotenv.config();

const makeAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const email = "admin@ventas.com";
  const user = await User.findOneAndUpdate(
    { email },
    { isAdmin: true },
    { new: true }
  );

  console.log("Usuario actualizado:", user);
  mongoose.connection.close();
};

makeAdmin();
