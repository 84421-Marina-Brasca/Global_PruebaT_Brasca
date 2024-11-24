import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const prevUser = await this.findOneByEmail(createUserDto.correo);
    const prevProfile = await this.profileRepository.findOneBy({
      username: createUserDto.profile.username,
    });

    if (prevProfile || prevUser) {
      console.log(prevProfile);
      throw new BadRequestException('Profile already exists!');
    }

    const newUser = this.userRepository.create(createUserDto);
    return await this.profileRepository
      .save(createUserDto.profile)
      .then(() => {
        this.userRepository.save({
          ...newUser,
          profile: createUserDto.profile,
        });
      })
      .then(() => {
        const responseDto = {
          nombre: newUser.nombre,
          apellido: newUser.apellido,
          correo: newUser.correo,
          edad: newUser.edad,
          username: newUser.profile.username,
        };
        return responseDto;
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  async findOneByEmail(correo: string) {
    return await this.userRepository.findOneBy({ correo });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(id);
  }
}
