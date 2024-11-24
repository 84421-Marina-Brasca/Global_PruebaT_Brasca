"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const profile_entity_1 = require("../profiles/entities/profile.entity");
let UsersService = class UsersService {
    constructor(userRepository, profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }
    async create(createUserDto) {
        const prevUser = await this.findOneByEmail(createUserDto.correo);
        const prevProfile = await this.profileRepository.findOneBy({
            username: createUserDto.profile.username,
        });
        if (prevProfile || prevUser) {
            console.log(prevProfile);
            throw new common_1.BadRequestException('Profile already exists!');
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
            throw new common_1.BadRequestException(error);
        });
    }
    async findOneByEmail(correo) {
        return await this.userRepository.findOneBy({ correo });
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.BadRequestException(`User with id ${id} not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        return await this.userRepository.update(id, updateUserDto);
    }
    async remove(id) {
        return await this.userRepository.softDelete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(profile_entity_1.Profile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map