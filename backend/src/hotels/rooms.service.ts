import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Hotel, HotelDocument } from './schemas/hotels.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { access, mkdir, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ICreateHotelDto } from './interfaces/dto/create-hotel';
import { IUpdateHotelDto } from './interfaces/dto/update-hotel';
import { INewHotelBodyDto } from './interfaces/dto/new-hotel-body';
import { Room, RoomDocument } from './schemas/rooms.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private RoomModel: Model<RoomDocument>,
  ) {}

  public findAll(): Promise<RoomDocument[]> {
    return this.RoomModel.find().exec();
  }

  

}