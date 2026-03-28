import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/common/config/db.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
     app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} at ${process.env.NODE_ENV} environment`);
    });
  }catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

start();