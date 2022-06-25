import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose
    .connect(
      "mongodb+srv://mahmoud:Ayan2704@cluster0.b7skb.mongodb.net/nextauth?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((con) => console.log("connected to DB"));
};

export default connectDB;
