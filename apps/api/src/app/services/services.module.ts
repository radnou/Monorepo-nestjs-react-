import {Module} from '@nestjs/common';
import {ServicesService} from './services.service';
import {ServicesController} from './services.controller';
import {Service} from "./entities/service.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServiceVersion} from "./entities/service-version.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceVersion])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {
}
