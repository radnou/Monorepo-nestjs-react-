import {Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import {ServicesService} from './services.service';
import {CreateServiceDto} from './dto/create-service.dto';
import {UpdateServiceDto} from './dto/update-service.dto';
import {Service} from "./entities/service.entity";

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(createServiceDto);
  }


  @Get()
  findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Service> {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.servicesService.remove(+id);
  }


}
