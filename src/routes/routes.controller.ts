import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { CreateRouteUseCase } from 'src/@core/application/create-route.use-case';
import { ListAllRoutesUseCase } from 'src/@core/application/list-all-routes.use-case';

@Controller('routes')
export class RoutesController {
  constructor(
    private createUseCase: CreateRouteUseCase,
    private listAllUseCase: ListAllRoutesUseCase,
  ) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.createUseCase.execute(createRouteDto);
  }

  @Get()
  findAll() {
    return this.listAllUseCase.execute();
  }
}
