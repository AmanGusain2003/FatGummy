import { Schema, model } from "mongoose";


const MessageSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
    },
    color: {
        type: String,
        default:"#880808",
    },
    emoji: {
        type: String,
        required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    reciever: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Message", MessageSchema);
