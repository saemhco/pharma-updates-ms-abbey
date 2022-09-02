import { Document } from "mongoose";

export interface Location extends Document {
    readonly latitude: string;
    readonly longitude: string;
    readonly driver_id: number;
    readonly createdAt: Date;
}