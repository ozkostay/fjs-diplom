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

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>,
  ) {}

  //=============================================================
  public findAll(): Promise<HotelDocument[]> {
    return this.HotelModel.find().exec();
  }

  //=============================================================
  public async create(files: any[], body: INewHotelBodyDto): Promise<ICreateHotelDto> {
    // Настройка пути
    const picsFolder = '/public/hotels';
    const folder = join(__dirname, '..', '..', picsFolder);
    console.log(folder);
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
      title: body.title,
      description: body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      files: JSON.stringify(resWriteFIles),
    };
    const hotel = this.HotelModel.create(newHotel);
    return hotel;
  }

  //=============================================================
  public update(id: string, data: IUpdateHotelDto): Promise<HotelDocument> {
    return this.HotelModel.findOneAndUpdate({ _id: id }, data);
  }

  //=============================================================
  public delete(id: string): Promise<HotelDocument> {
    return this.HotelModel.findOneAndDelete({ _id: id });
  }
}
