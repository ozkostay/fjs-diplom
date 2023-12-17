import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  public findAll(): any {
    return this.hotelsService.findAll();
  }

  @Post('/admin/hotels')
  public create(@Body() body: any): any {
    // console.log('hotels post body', body);
    return { mess: 'Добавляем гостиницу' };
    //return this.hotelsService.create(body);
  }

  @Post('/admin/hotels/uploadpics')
  @UseInterceptors(FilesInterceptor('files'))
  public uploadpics(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ): any {
    console.log('hotels post upload FILES', files);
    console.log('hotels post upload BODY', body);
    // return { mess: 'Добавляем картинки гостиницы'}
    return this.hotelsService.create(files);
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
