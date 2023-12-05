import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { ICreateHotelDto } from './interfaces/dto/create-hotel';
import { IUpdateHotelDto } from './interfaces/dto/update-hotel';

@Controller('api')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService){}

  @Get('/admin/hotels')
  public findAll(): any {
    return this.hotelsService.findAll();
  }

  @Post('/admin/hotels')
  public create(@Body() createHotelDto: ICreateHotelDto): any {
    return this.hotelsService.create(createHotelDto);
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
