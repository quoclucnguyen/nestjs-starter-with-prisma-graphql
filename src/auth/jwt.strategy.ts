import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, Logger, LoggerService, UnauthorizedException } from '@nestjs/common';
import { UserLogin } from './current-user.decotator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  protected readonly logger = new Logger();

  constructor(
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY_IN_HERE_WILL_BE_REPEATED_IN_PRODUCTION_WITH_CONFIG_SERVICE',
    });

  }

  async validate(payload: Payload) {
    const user = await this.userService.findOne(payload.id);
    if (user) {
      return user;
    }
    return new UnauthorizedException();
  }
}

type Payload = {
  id: number;
  token: string
};
