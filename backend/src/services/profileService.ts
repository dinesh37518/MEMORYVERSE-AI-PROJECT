import { DatabaseService } from '../database/supabaseClient';
import { UserProfile } from '../models/types';

export class ProfileService {
  static async getProfile(regNo: string): Promise<Partial<UserProfile> | null> {
    return await DatabaseService.getProfileByRegNo(regNo);
  }

  static async updateProfile(profile: UserProfile): Promise<boolean> {
    return await DatabaseService.upsertProfile(profile);
  }
}
