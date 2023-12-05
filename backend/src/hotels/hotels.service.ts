import { Injectable } from '@nestjs/common';
import { ICreateHotelDto } from './interfaces/dto/create-hotel';
import { IUpdateHotelDto } from './interfaces/dto/update-hotel';
import { Hotel, HotelDocument } from './schemas/hotels.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>) {}
  
  public findAll(): Promise<HotelDocument[]> {
    return this.HotelModel.find().exec();
  }

  public create(hotel: ICreateHotelDto): Promise<HotelDocument> {
    const newHotel = this.HotelModel.create(hotel)
    return newHotel;
  }

  public update(id: string, data: IUpdateHotelDto): Promise<HotelDocument> {
    return this.HotelModel.findOneAndUpdate({ _id: id }, data);
  }

  public delete(id: string): Promise<HotelDocument> {
    return this.HotelModel.findOneAndDelete({ _id: id });
  }
}
