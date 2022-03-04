import { InputType, Int, Field, OmitType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, Validate, IsIn } from 'class-validator';
import { User } from '../entities/user.entity';
import { UsernameValidator } from '../validators/username-validator';

@InputType()
export class CreateUserInput {
    @IsNotEmpty()
    @Validate(UsernameValidator)
    @Field(() => String)
    username: string;

    @IsNotEmpty()
    @Field(() => String)
    password: string;

    @IsNotEmpty()
    @Field(() => String)
    name: string;

    @IsEmail()
    @Field(() => String)
    email: string;

    @IsIn(Object.values(Role))
    @IsNotEmpty()
    @Field(() => String)
    role: Role;
}
