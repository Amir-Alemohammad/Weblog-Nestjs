//----------------------this strategy for authentication with cookies----------------------//
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from 'src/interface/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
  
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }
  async validate(payload: Payload) {
    return {
        id: payload.id,
        email: payload.email,
        Role:payload.Role
    };
  }
}

// --------------Important : this strategy for authentication with header----------------//
// import {Injectable} from "@nestjs/common"
// import {PassportStrategy} from "@nestjs/passport";
// import {Strategy , ExtractJwt} from "passport-jwt"
// import { Payload } from "src/interface/payload.interface";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy){
//     constructor(){
//         super({
//             // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             // ignoreExpiration: false,
//             // secretOrKey: process.env.JWT_SECRET
//       
//         })
//     }
//     async validate(payload : Payload){
//         return {
//         id: payload.id,
//         email: payload.email,
//         }
//     }
// }



