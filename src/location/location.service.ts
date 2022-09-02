import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDTO } from './dtos/location.dto';
import { Location } from './interfaces/location.interface';

@Injectable()
export class LocationService {
    constructor(@InjectModel('Location') private readonly locationModel: Model<Location>) { }

    // Get all locations
    async getLocations(): Promise<Location[]> {
        const locations = await this.locationModel.find();
        return locations;
    }

    // Get a single location
    async getLocation(locationID: string): Promise<Location> {
        const location = await this.locationModel.findById(locationID);
        return location;
    }

    // Post a single location
    async createLocation(createLocationDTO: CreateLocationDTO): Promise<Location> {
        const newLocation = new this.locationModel(createLocationDTO);
        return newLocation.save();
    }

    // Delete Location
    async deleteLocation(locationID: any): Promise<any> {
        const deletedLocation = await this.locationModel.findOneAndDelete(locationID);
        return deletedLocation;
    }

    // Put a single location
    async updateLocation(locationID: string, createLocationDTO: CreateLocationDTO): Promise<Location> {
        const updatedLocation = await this.locationModel
            .findByIdAndUpdate(locationID, createLocationDTO, { new: true });
        return updatedLocation;
    }
}
