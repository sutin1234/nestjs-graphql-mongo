import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto {
  @Field()
  readonly email: string;
}
