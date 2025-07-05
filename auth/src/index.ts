import mongoose from "mongoose";
import app from "./app"
// mongodb connection

const startMongodb = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log('Mongodb connected')
  } catch (error) {
    console.error(error);
  }
};

app.listen(3000, () => {
  console.log(`port is Listen at 3000!!!!!!!`);
});

startMongodb()
