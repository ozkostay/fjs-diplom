import { Body, Controller, Get, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoomDocument } from './schemas/rooms.schema';
import { INewRoomBodyDto } from './interfaces/dto/new-room-body';
import { JwtAdmin } from 'src/auth/jwt.auth.admin';

@Controller('api')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('/common/hotel-rooms')
  public findAll(@Query() params :any): Promise<RoomDocument[]> {
    return this.roomsService.findAll(params);
  }

  @UseGuards(JwtAdmin)
  @Post('/admin/hotel-rooms')
  @UseInterceptors(FilesInterceptor('files'))
  public create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: INewRoomBodyDto,
  ): Promise<RoomDocument>  {
    return this.roomsService.create(files, body);
  }
}
