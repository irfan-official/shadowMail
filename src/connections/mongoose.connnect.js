import mongoose from "mongoose";

const connection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connnected to MongoDB", process.env.MONGODB_DATABASE);
    })
    .catch((error) => {
      console.log("MongoDB connection error: ", error);
    });
};

export default connection;
