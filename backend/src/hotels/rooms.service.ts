import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { access, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Room, RoomDocument } from './schemas/rooms.schema';
import { INewRoomBodyDto } from './interfaces/dto/new-room-body';
import { HotelsService } from './hotels.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private RoomModel: Model<RoomDocument>,
    private readonly hotelService: HotelsService,
  ) {}

  public async findAll(params: any): Promise<RoomDocument[]> {
    const { offset, limit, hotelid } = params;
    const qOffset = Number(offset);
    const qLimit = Number(limit);
    
    return await this.RoomModel.find({ hotel: hotelid })
      .skip(qOffset * qLimit)
      .limit(qLimit + 1)
      .exec();
  }

  public async create(files: any[], body: INewRoomBodyDto): Promise<RoomDocument> {
      // Настройка пути
      const picsFolder = '/public/rooms';
      const folder = join(__dirname, '..', '..', picsFolder);
      // Проверка наличия папки
      try {
        await access(folder);
      } catch (e) {
        await mkdir(folder, { recursive: true });
      }
      // Подготовка массива с файлами
      const resWriteFIles = await Promise.all(
        files.map(async (file) => {
          const fileExtension = file.originalname.split('.')[1];
          // Проверка файла на соответствие
          if (
            !file.mimetype.includes('image') ||
            !['png', 'jpg', 'jpeg', 'webp'].includes(fileExtension)
          ) {
            console.log(
              `Файл${file.originalname} не я вляется изображением или имеет не допустимый формат`,
            );
            return;
          }
          const newFileName = `${uuidv4()}.${fileExtension}`;
          try {
            await writeFile(join(folder, newFileName), file.buffer); // video 3:43 and 2.26
          } catch (error) {
            console.log('ERROR WRITE files', error.message);
          }
          return {
            url: `${picsFolder}/${newFileName}`,
            name: newFileName,
          };
        }),
      );
      const newHotel = {
        hotel: body.hotelId,
        title: body.title,
        description: body.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAnable: body.isAnable,
        images: JSON.stringify(resWriteFIles),
      };
      const room = this.RoomModel.create(newHotel);
      return room;
  }
}
