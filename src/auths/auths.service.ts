// src/auths/auths.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entity/Profile';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.profileRepository.findOne({ where: { username } });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registerUser(username: string, password: string, fullname: string, mail: string, phone_number: string, location: string, is_farmer: boolean): Promise<Profile> {
    const hashedPassword = bcrypt.hashSync(password, 12);

    // If is_farmer is not provided, set it to false by default
    if (is_farmer === undefined) {
        is_farmer = false;
    }

    const newUser = this.profileRepository.create({
      username,
      password: hashedPassword,
      fullname,
      mail,
      phone_number,
      location,
      is_farmer
    });
    await this.profileRepository.save(newUser);
    return newUser;
  }
}
