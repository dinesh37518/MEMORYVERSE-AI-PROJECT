import { DatabaseService } from '../database/supabaseClient';
import { sendVerificationEmail } from '../utils/emailJsService';
import { UserProfile } from '../models/types';

export class AuthService {
  static async login(email: string, password?: string, userDetails?: Partial<UserProfile>) {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check or fetch existing profile
    const existingProfile = userDetails?.regNo ? await DatabaseService.getProfileByRegNo(userDetails.regNo) : null;
    
    const userProfile: UserProfile = {
      name: userDetails?.name || existingProfile?.name || email.split('@')[0],
      email: cleanEmail,
      regNo: userDetails?.regNo || existingProfile?.regNo || 'REG' + Math.floor(100000 + Math.random() * 900000),
      department: userDetails?.department || existingProfile?.department || 'Computer Science',
      role: userDetails?.role || existingProfile?.role || 'student',
      ...existingProfile,
      ...userDetails
    };

    // Sync profile to database
    await DatabaseService.upsertProfile(userProfile);

    return {
      success: true,
      token: 'jwt_token_' + Date.now(),
      user: userProfile
    };
  }

  static async register(userData: UserProfile) {
    const cleanEmail = userData.email.trim().toLowerCase();
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store profile in database
    await DatabaseService.upsertProfile(userData);

    // Send verification email
    const emailResult = await sendVerificationEmail(cleanEmail, verificationCode, userData.name);

    return {
      success: true,
      verificationCode,
      emailResult,
      user: userData
    };
  }
}
