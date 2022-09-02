import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CreateLocationDTO } from './dtos/location.dto';
import { LocationService } from './location.service';
import { PusherService } from './pusher.service';

@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService, private chatService: PusherService) { }

    @Post()
    async createLocation(@Res() res, @Body() createLocationDTO: CreateLocationDTO) {
        const product = await this.locationService.createLocation(createLocationDTO);
        this.chatService.addMessage({
            latitude: product.latitude,
            longitude: product.longitude,
            driver_id: product.driver_id
        })
        //res.status(HttpStatus.OK).send("Comment posted successfully");
        return res.status(HttpStatus.OK).json({
            message: 'Successfully Created',
            product
        });
    }

    @Get()
    async getLocations(@Res() res) {
        const locations = await this.locationService.getLocations();
        return res.status(HttpStatus.OK).json(locations);
    }

    // GET single location: /location/5c9d46100e2e5c44c444b2d1
    @Get('/:id')
    async getLocation(@Res() res, @Param('id') id) {
        const data = await this.locationService.getLocation(id);
        if (!data) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json(data);
    }

    // Delete Product: /delete?productID=5c9d45e705ea4843c8d0e8f7
    @Delete('/:id')
    async deleteProduct(@Res() res, @Param('id',) id) {
        const locationDeleted = await this.locationService.deleteLocation(id);
        if (!locationDeleted) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json({
            message: 'Deleted Successfully',
            locationDeleted
        });
    }

    // Update Product: /update?productID=5c9d45e705ea4843c8d0e8f7
    @Put('/:id')
    async updateLocation(@Res() res, @Body() createLocationDTO: CreateLocationDTO, @Param('id') id) {
        const updateLocation = await this.locationService.updateLocation(id, createLocationDTO);
        if (!updateLocation) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json({
            message: 'Updated Successfully',
            updateLocation
        });
    }
}
