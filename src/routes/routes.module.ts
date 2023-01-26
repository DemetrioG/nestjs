import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { CreateRouteUseCase } from '../@core/application/create-route.use-case';
import { RouteRepositoryInterface } from '../@core/domain/route.repository';
import { ListAllRoutesUseCase } from '../@core/application/list-all-routes.use-case';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { RouteSchema } from 'src/@core/infra/db/typeorm/route.schema';
import { RouteTypeORMRepository } from 'src/@core/infra/db/typeorm/route-typeorm.repository';
import { DataSource } from 'typeorm';
import { Route } from 'src/@core/domain/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteSchema])],
  controllers: [RoutesController],
  providers: [
    {
      provide: RouteTypeORMRepository,
      useFactory: (dataSource: DataSource) => {
        return new RouteTypeORMRepository(dataSource.getRepository(Route));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateRouteUseCase,
      useFactory: (routeRepository: RouteRepositoryInterface) => {
        return new CreateRouteUseCase(routeRepository);
      },
      inject: [RouteTypeORMRepository],
    },
    {
      provide: ListAllRoutesUseCase,
      useFactory: (routeRepository: RouteRepositoryInterface) => {
        return new ListAllRoutesUseCase(routeRepository);
      },
      inject: [RouteTypeORMRepository],
    },
  ],
})
export class RoutesModule {}
