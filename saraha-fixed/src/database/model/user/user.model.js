import mongoose from "mongoose";
import { genderEnum } from "../../../common/enums/index.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: 50,
      minLength: 3,
      required: true,
    },
    lastName: {
      type: String,
      maxLength: 50,
      minLength: 3,
      required: true,
    },
    email: {
      type: String,
      maxLength: 50,
      minLength: 3,
      required: true,
      unique: true,
    },
    gender: {
      type: Number,
      enum: Object.values(genderEnum),
      default: genderEnum.male,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    autoIndex: true,
  }
); 

userSchema
  .virtual("userName")
  .set(function (value) {
    let [firstName, lastName] = value.split(" "); 
    this.firstName = firstName;
    this.lastName = lastName;
  })
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

export const userModel = mongoose.model("user", userSchema);