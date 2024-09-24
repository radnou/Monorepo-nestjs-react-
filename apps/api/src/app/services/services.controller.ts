import {Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, HttpException} from '@nestjs/common';
import {ServicesService} from './services.service';
import {CreateServiceDto} from './dto/create-service.dto';
import {UpdateServiceDto} from './dto/update-service.dto';
import {Service} from "./entities/service.entity";
import {ServiceLauncher} from "./service-launcher.service";
import {ServiceMonitor} from "../monitor/service-monitor.service";

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService,
              private readonly serviceLauncher: ServiceLauncher,
              private readonly serviceMonitor: ServiceMonitor) {
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
// Lancer un service via Podman/Docker
  @Post('launch/:id')
  async launchService(@Param('id') serviceId: number) {
    try {
      const result = await this.serviceLauncher.launchService(serviceId);
      return {
        message: 'Service launched successfully',
        containerId: result,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Obtenir le statut du service (Podman/Docker)
  @Get('status/:id')
  async getServiceStatus(@Param('id') serviceId: number) {
    try {
      const status = await this.serviceMonitor.getServiceStatus(serviceId);
      return {
        message: `Service status retrieved`,
        status: status,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Obtenir les logs d'un service via Podman/Docker
  @Get('logs/:id')
  async getServiceLogs(@Param('id') serviceId: number) {
    try {
      const logs = await this.serviceMonitor.getServiceLogs(serviceId);
      return {
        message: `Service logs retrieved`,
        logs: logs,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
