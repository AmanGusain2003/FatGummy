import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    roomId: {
      type: String,
      default: "",
    },
    partnerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    themeColor: {
      type: String,
      default: "pink",
    },
    inviteToken: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", UserSchema);
