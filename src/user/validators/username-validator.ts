import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'username', async: true })
@Injectable()
export class UsernameValidator implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) { }
    async validate(input: string, args: ValidationArguments) {
        const user = await this.userService.findByUsername(input);
        return !user;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Username ($value) đã có trong hệ thống';
    }
}