/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
@Injectable()
export class PusherService {
    addMessage(data) {
        const Pusher = require('pusher');
        const location = {
            latitude: data.latitude,
            longitude: data.longitude,
            driver_id: data.driver_id
        }
        const pusher = new Pusher({ // replace with valid credentials
            appId: '1467914',
            key: 'd8468bb5561b7f89647b',
            secret: 'c98a2c155e4a09028fb0',
            cluster: 'us2',
            encrypted: true
        });
        pusher.trigger('locations', 'new-location', location);
    }
}