import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserLoginInput {
  @Field()
  readonly email: string;
}
