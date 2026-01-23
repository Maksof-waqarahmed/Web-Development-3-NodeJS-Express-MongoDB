import mongoose, { Types } from "mongoose";

export interface AddressModel {
  user: Types.ObjectId;
  country: string;
  city: string;
  postalCode: string;
  addressLine: string;
}

const addressSchema = new mongoose.Schema<AddressModel>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Address = mongoose.model<AddressModel>(
  "Address",
  addressSchema
);
