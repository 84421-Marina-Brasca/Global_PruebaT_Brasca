import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let profileRepository: Repository<Profile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Profile),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    profileRepository = module.get<Repository<Profile>>(
      getRepositoryToken(Profile),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const validCreateUserDto = {
      nombre: 'John',
      apellido: 'Doe',
      correo: 'john.doe@example.com',
      edad: 30,
      profile: {
        username: 'johndoe',
        password: 'StrongPass1!',
        rol: 'admin',
      },
    };

    it('should create a user with a profile successfully', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null); // No user with the given email exists
      jest.spyOn(profileRepository, 'findOneBy').mockResolvedValue(null); // No profile with the given username exists
      jest
        .spyOn(userRepository, 'create')
        .mockReturnValue(validCreateUserDto as any);
      jest.spyOn(profileRepository, 'save').mockResolvedValue({
        ...validCreateUserDto.profile,
        id: 1,
        deletedAt: undefined,
        user: undefined,
      });
      jest.spyOn(userRepository, 'save').mockResolvedValue({
        ...validCreateUserDto,
        id: 1,
        deletedAt: undefined,
        profile: {
          ...validCreateUserDto.profile,
          id: 1,
          deletedAt: undefined,
          user: undefined,
        },
      });

      const result = await service.create(validCreateUserDto);

      expect(result).toEqual({
        nombre: 'John',
        apellido: 'Doe',
        correo: 'john.doe@example.com',
        edad: 30,
        username: 'johndoe',
      });
      expect(profileRepository.save).toHaveBeenCalledWith({
        ...validCreateUserDto.profile,
        deletedAt: undefined,
        user: undefined,
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        ...validCreateUserDto,
        profile: {
          ...validCreateUserDto.profile,
          id: 1,
          deletedAt: undefined,
          user: undefined,
        },
        deletedAt: undefined,
      });
    });

    it('should throw an error if email already exists', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValue(validCreateUserDto as any); // User with the given email exists

      await expect(service.create(validCreateUserDto)).rejects.toThrow(
        new BadRequestException('Profile already exists!'),
      );
    });

    it('should throw an error if username already exists', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null); // No user with the given email exists
      jest
        .spyOn(profileRepository, 'findOneBy')
        .mockResolvedValue(validCreateUserDto.profile as any); // Profile with the given username exists

      await expect(service.create(validCreateUserDto)).rejects.toThrow(
        new BadRequestException('Profile already exists!'),
      );
    });
  });

  describe('remove', () => {
    it('should soft delete a user successfully', async () => {
      jest
        .spyOn(userRepository, 'softDelete')
        .mockResolvedValue({ affected: 1 } as any);

      const result = await service.remove(1);

      expect(result).toEqual({ affected: 1 });
      expect(userRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the user does not exist', async () => {
      jest
        .spyOn(userRepository, 'softDelete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(999)).rejects.toThrow(
        new BadRequestException('User with id 999 not found'),
      );
    });
  });
});
