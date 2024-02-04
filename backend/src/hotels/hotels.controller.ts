import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { ICreateHotelDto } from './interfaces/dto/create-hotel';
import { IUpdateHotelDto } from './interfaces/dto/update-hotel';
import { FilesInterceptor } from '@nestjs/platform-express';
import { INewHotelBodyDto } from './interfaces/dto/new-hotel-body';
import { HotelDocument } from './schemas/hotels.schema';

@Controller('api')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get('/admin/hotels')
  public findAll(@Query() params: any): any {
    return this.hotelsService.findAll(params);
  }

  @Post('/admin/hotels/') // Убрать uploadpics
  @UseInterceptors(FilesInterceptor('files'))
  public uploadpics(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: INewHotelBodyDto,
  ): Promise<any> {
    return this.hotelsService.create(files, body);
  }

  @Put('/admin/hotels/:id')
  public update(@Param('id') id: string, @Body() data: IUpdateHotelDto): Promise<HotelDocument> {
    return this.hotelsService.update(id, data);
  }

  @Delete('/admin/hotels/:id')
  public delete(@Param('id') id: string): Promise<HotelDocument> {
    return this.hotelsService.delete(id);
  }
}
