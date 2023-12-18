import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../entity/Profile';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [AuthsController],
  providers: [AuthsService],
})
export class AuthsModule {}
