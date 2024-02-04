import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ICreateReservationDto } from './interfaces/dto/create-reservation';

@Controller('api')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('/client/reservations')
  public findByUserId(@Query() params: any) {
    return this.reservationService.findByUserId(params);
  }

  @Post('/client/reservations')
  public create(@Body() body: ICreateReservationDto): any {
    return this.reservationService.create(body);
  }

  @Delete('/client/reservations/:id')
  public delete(@Param() { id }: any): any {
    return this.reservationService.delete(id);
  }
}
