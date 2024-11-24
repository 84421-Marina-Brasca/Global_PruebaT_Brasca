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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const profile_entity_1 = require("./entities/profile.entity");
const typeorm_2 = require("typeorm");
const bcryptjs = require("bcryptjs");
let ProfilesService = class ProfilesService {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async findOneByUsername(username) {
        return await this.profileRepository.findOneBy({ username });
    }
    async create(createProfileDto) {
        const { username, password } = createProfileDto;
        const user = await this.findOneByUsername(username);
        if (user) {
            throw new common_1.BadRequestException('User already exists');
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
    async findOne(id) {
        const profile = await this.profileRepository.findOneBy({ id });
        if (!profile) {
            throw new common_1.BadRequestException('Profile not found');
        }
        return profile;
    }
    async update(id, updateProfileDto) {
        const profile = await this.profileRepository.findOneBy({ id });
        if (!profile) {
            throw new common_1.BadRequestException('Profile not found');
        }
        if (updateProfileDto.password) {
            updateProfileDto.password = await bcryptjs.hash(updateProfileDto.password, 10);
        }
        Object.assign(profile, updateProfileDto);
        return await this.profileRepository.save(profile);
    }
    async remove(id) {
        return await this.profileRepository.softDelete(id);
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_entity_1.Profile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map