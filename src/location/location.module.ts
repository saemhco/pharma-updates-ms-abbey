import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { PusherService } from './pusher.service';
import { LocationSchema } from './schemas/location.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Location', schema: LocationSchema }])],
  controllers: [LocationController],
  providers: [LocationService, PusherService]
})
export class LocationModule { }
