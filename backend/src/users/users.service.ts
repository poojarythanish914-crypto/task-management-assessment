import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findById(id: string) {
    return this.userModel.findById(id).lean();
  }

  async findOrCreateGuest() {
    const email = "guest@taskflow.local";
    const existing = await this.userModel.findOne({ email });
    if (existing) return existing;

    return this.userModel.create({
      name: "Guest User",
      email,
      isGuest: true,
    });
  }
}
