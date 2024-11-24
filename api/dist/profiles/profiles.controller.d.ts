import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    create(createProfileDto: CreateProfileDto): Promise<import("./entities/profile.entity").Profile>;
    findAll(): Promise<import("./entities/profile.entity").Profile[]>;
    findOne(id: number): Promise<import("./entities/profile.entity").Profile>;
    update(id: number, updateProfileDto: UpdateProfileDto): Promise<import("./entities/profile.entity").Profile>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
