import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ProfilesService } from 'src/profiles/profiles.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProfilesModule],
  controllers: [UsersController],
  providers: [UsersService, ProfilesService],
})
export class UsersModule {}
