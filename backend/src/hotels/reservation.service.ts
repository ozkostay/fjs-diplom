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
import { INewRoomBodyDto } from './interfaces/dto/new-room-body';
import { HotelsService } from './hotels.service';
import { Reservation, ReservationDocument } from './schemas/reservations.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private ReservationModel: Model<ReservationDocument>,
    private readonly hotelService: HotelsService,
  ) {}

  public create(body: any): any {
    console.log('Бронь service BODY', body);
    return 'БРОНИРУЕМ'
  }
  // public async findAll(params: any): Promise<RoomDocument[]> {
  //   console.log('rooms params ', params);
  //   const { offset, limit, hotelid } = params;
  //   const qOffset = Number(offset);
  //   const qLimit = Number(limit);
  //   // const searchString = new RegExp(search, 'i');
  //   // return await this.RoomModel.find({
  //   //   $or: [{ name: searchString }, { email: searchString }, { contactPhone: searchString }],
  //   // })
  //   return await this.RoomModel.find({ hotel: hotelid })
  //     .skip(qOffset * qLimit)
  //     .limit(qLimit + 1)
  //     .exec();
  //   // return this.RoomModel.find().exec();
  // }

  // public async create(files: any[], body: INewRoomBodyDto): Promise<any> {
  //     // Настройка пути
  //     const picsFolder = '/public/rooms';
  //     const folder = join(__dirname, '..', '..', picsFolder);
  //     // Проверка наличия папки
  //     try {
  //       await access(folder);
  //     } catch (e) {
  //       await mkdir(folder, { recursive: true });
  //     }
  //     // Подготовка массива с файлами
  //     const resWriteFIles = await Promise.all(
  //       files.map(async (file) => {
  //         const fileExtension = file.originalname.split('.')[1];
  //         // Проверка файла на соответствие
  //         if (
  //           !file.mimetype.includes('image') ||
  //           !['png', 'jpg', 'jpeg', 'webp'].includes(fileExtension)
  //         ) {
  //           console.log(
  //             `Файл${file.originalname} не я вляется изображением или имеет не допустимый формат`,
  //           );
  //           return;
  //         }
  //         const newFileName = `${uuidv4()}.${fileExtension}`;
  //         try {
  //           await writeFile(join(folder, newFileName), file.buffer); // video 3:43 and 2.26
  //         } catch (error) {
  //           console.log('ERROR WRITE files', error.message);
  //         }
  //         return {
  //           url: `${picsFolder}/${newFileName}`,
  //           name: newFileName,
  //         };
  //       }),
  //     );
  //     const newHotel = {
  //       hotel: body.hotelId,
  //       title: body.title,
  //       description: body.description,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       isAnable: body.isAnable,
  //       images: JSON.stringify(resWriteFIles),
  //     };
  //     const room = this.RoomModel.create(newHotel);
  //     return room;
  // }
}

