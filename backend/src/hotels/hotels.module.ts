import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotetlSchema } from './schemas/hotels.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Hotel.name, schema: HotetlSchema}
    ])
  ],
  controllers: [HotelsController],
  providers: [HotelsService]
})
export class HotelsModule {}
