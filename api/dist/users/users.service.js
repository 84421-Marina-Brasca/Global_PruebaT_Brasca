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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const prevUser = yield this.findOneByEmail(createUserDto.correo);
            const prevProfile = yield this.profileRepository.findOneBy({
                username: createUserDto.profile.username,
            });
            if (prevProfile || prevUser) {
                console.log(prevProfile);
                throw new common_1.BadRequestException('Profile already exists!');
            }
            const newUser = this.userRepository.create(createUserDto);
            return yield this.profileRepository
                .save(createUserDto.profile)
                .then(() => {
                this.userRepository.save(Object.assign(Object.assign({}, newUser), { profile: createUserDto.profile }));
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
        });
    }
    findOneByEmail(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOneBy({ correo });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneBy({ id });
            if (!user) {
                throw new common_1.BadRequestException(`User with id ${id} not found`);
            }
            return user;
        });
    }
    update(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.update(id, updateUserDto);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.softDelete(id);
        });
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