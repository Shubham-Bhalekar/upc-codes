// src/auth/jwt.strategy.ts

import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // Use a more secure key and store it in an environment variable
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
