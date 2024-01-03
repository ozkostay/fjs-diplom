import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ReservationService } from './reservation.service';

@Controller('api')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // @Get('/common/hotel-rooms')
  // public findAll(@Query() params :any): Promise<any> {
  //   return this.roomsService.findAll(params);
  // }

  @Post('/client//reservations')
  public create(
    @Body() body: any,
  ): any {
    // вернуть промис
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
  