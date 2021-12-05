import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BookInput {
  @Field()
  readonly title: string;

  @Field()
  readonly author: string;
}

@InputType()
export class IdBookInput {
  @Field()
  readonly _id: string;
}

@InputType()
export class UpdateBookInput {
  @Field()
  readonly _id: string;

  @Field()
  readonly title: string;

  @Field()
  readonly author: string;
}

@InputType()
export class CriteriaBookInput {
  @Field({ nullable: true })
  readonly _id: string;

  @Field({ nullable: true })
  readonly title: string;

  @Field({ nullable: true })
  readonly author: string;
}
