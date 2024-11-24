import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
export declare class ProfilesService {
    private profileRepository;
    constructor(profileRepository: Repository<Profile>);
    findOneByUsername(username: string): Promise<Profile>;
    create(createProfileDto: CreateProfileDto): Promise<Profile>;
    findAll(): Promise<Profile[]>;
    findOne(id: number): Promise<Profile>;
    update(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
