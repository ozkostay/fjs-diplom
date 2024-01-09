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
  public findByUserId(@Query() params: any) {
    //console.log('GET controller FIND BRON', params);
    return this.reservationService.findByUserId(params);
  }

  @Post('/client/reservations')
  public create(
    @Body() body: ICreateReservationDto,
  ): any {
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
  