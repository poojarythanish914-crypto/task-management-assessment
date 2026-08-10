import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async guestLogin() {
    const user = await this.usersService.findOrCreateGuest();
    const accessToken = await this.jwtService.signAsync({
      sub: user._id.toString(),
      email: user.email,
      isGuest: true,
    });

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };
  }

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
