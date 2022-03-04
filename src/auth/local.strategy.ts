import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true });
  }

  async validate(@Request() req, token: string): Promise<any> {
    const { username, password, type } = req.body;
    let user = await this.authService.validateUser(username, password, type);
    if (!user) {
      throw new BadRequestException('Không tìm thấy tài khoản hoặc sai mật khẩu');
    }
    return user;
  }
}
