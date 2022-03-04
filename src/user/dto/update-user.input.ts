import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, []) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  accessToken?: string
}
