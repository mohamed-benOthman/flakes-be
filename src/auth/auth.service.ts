import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async createToken() {
        const user: any = { email: 'test@email.com' };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: 86400,
            accessToken,
        };
    }

    async validateUser(payload: any): Promise<any> {
        // put some validation logic here
        // for example query user by id/email/username
        return {};
    }
}
