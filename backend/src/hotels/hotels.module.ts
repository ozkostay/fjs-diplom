import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotetlSchema } from './schemas/hotels.schema';
import { Room, RoomSchema } from './schemas/rooms.schema';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Hotel.name, schema: HotetlSchema},
      {name: Room.name, schema: RoomSchema},
    ])
  ],
  controllers: [HotelsController, RoomsController],
  providers: [HotelsService, RoomsService]
})
export class HotelsModule {}
