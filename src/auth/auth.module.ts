import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { RolesGuard } from './roles.guard';

@Module({

  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: "SECRET_KEY_IN_HERE_WILL_BE_REPEATED_IN_PRODUCTION_WITH_CONFIG_SERVICE",
      signOptions: { expiresIn: '7day' },
    })],
  providers: [
    AuthService,
    LocalStrategy,
    RolesGuard,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule { }
