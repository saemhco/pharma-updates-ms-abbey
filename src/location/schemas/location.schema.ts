import { Schema } from "mongoose";

export const LocationSchema = new Schema({
    latitude: String,
    longitude: String,
    driver_id: Number,
    createdAt: { type: Date, default: Date.now }
});

