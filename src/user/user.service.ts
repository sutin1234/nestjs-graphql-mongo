import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
import { UserLoginInput } from "./input/user.input";
import * as jwt from "jsonwebtoken";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private bookModel: Model<User>) {
  }

  createToken({ email }: UserLoginInput) {
    console.log({ email });
    return jwt.sign({ email }, "secret");
  }

  getLogin(input: UserLoginInput): string {
    return this.createToken({ ...input });
  }
}
