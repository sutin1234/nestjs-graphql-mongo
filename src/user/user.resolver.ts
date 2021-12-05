import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { UserLoginInput } from "./input/user.input";

@Resolver("user")
export class UserResolver {
  constructor(private userService: UserService) {
  }

  @Mutation(() => UserDto)
  async login(@Args("input") input: UserLoginInput) {
    const email = this.userService.getLogin(input);
    return { email };
  }
}
