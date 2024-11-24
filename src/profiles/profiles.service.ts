import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async findOneByUsername(username: string) {
    return await this.profileRepository.findOneBy({ username });
  }

  async create(createProfileDto: CreateProfileDto) {
    const { username, password } = createProfileDto;
    const user = await this.findOneByUsername(username);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const newUser = this.profileRepository.create({
      username: 'exampleUsername',
      password: await bcryptjs.hash(password, 10),
      rol: 'admin',
    });

    return await this.profileRepository.save(newUser);
  }

  async findAll() {
    return await this.profileRepository.find();
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }
    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    if (updateProfileDto.password) {
      updateProfileDto.password = await bcryptjs.hash(
        updateProfileDto.password,
        10,
      );
    }

    Object.assign(profile, updateProfileDto);
    return await this.profileRepository.save(profile);
  }

  async remove(id: number) {
    return await this.profileRepository.softDelete(id);
  }
}
