import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: 6,
      maxlength: 20,
      select: false, // to exclude password from query results by default
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,      
    },
    verificationToken: {
      type: String,
      select:false
    },
    refreshToken: {
      type: String,
      select:false
    },
    passwordResetToken: {
      type: String,
      select:false
    },
    passwordResetExpires: {
      type: Date,
      select:false
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
