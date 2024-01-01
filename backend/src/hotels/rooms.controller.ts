import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('/common/hotel-rooms')
  public findAll(): Promise<any> {
    return this.roomsService.findAll();
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
}
  
