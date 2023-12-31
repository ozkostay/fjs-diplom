import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('/common/hotel-rooms')
  public findAll(@Query() params :any): Promise<any> {
    return this.roomsService.findAll(params);
  }

  @Post('/admin/hotel-rooms')
  @UseInterceptors(FilesInterceptor('files'))
  public create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ): any {
    // вернуть промис
    return this.roomsService.create(files, body);
  }

  // @Post('/api/client/reservations')
  // public reservations(
  //   @Body() body: any,
  // ): any {
  //   // вернуть промис
  //   // return this.roomsService.create(files, body);
  // }

}
  
