import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ReservationService } from './reservation.service';
import { ICreateReservationDto } from './interfaces/dto/create-reservation';

@Controller('api')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // @Get('/common/hotel-rooms')
  // public findAll(@Query() params :any): Promise<any> {
  //   return this.roomsService.findAll(params);
  // }

  @Get('/client/reservations')
  public findAll() {
    console.log('GET controller FIND BRON');
    return this.reservationService.findAll();
  }

  @Post('/client/reservations')
  public create(
    @Body() body: ICreateReservationDto,
  ): any {
    // вернуть промис
    console.log('CREAT BRON', body);
    return this.reservationService.create(body);
  }

  // @Post('/api/client/reservations')
  // public reservations(
  //   @Body() body: any,
  // ): any {
  //   // вернуть промис
  //   // return this.roomsService.create(files, body);
  // }

}
  