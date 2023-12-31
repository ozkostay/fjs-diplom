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

@Controller('api')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get('/admin/hotels')
  public findAll(@Query() params: any): any {
    console.log('get params', params);
    return this.hotelsService.findAll(params);
  }

  @Post('/admin/hotels/uploadpics') // Убрать uploadpics
  @UseInterceptors(FilesInterceptor('files'))
  public uploadpics(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ): Promise<any> {
    return this.hotelsService.create(files, body);
  }

  @Put('/admin/hotels/:id')
  public update(@Param('id') id: string, @Body() data: IUpdateHotelDto): any {
    return this.hotelsService.update(id, data);
  }

  @Delete('/admin/hotels/:id')
  public delete(@Param('id') id: string): any {
    return this.hotelsService.delete(id);
  }
}
