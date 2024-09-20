import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsTimeString(validationOptions?: ValidationOptions){
    return function(object: Object, propertyName: string){
        registerDecorator({
            name: 'isTimeString',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments){
                    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
                    return typeof value === 'string' && timeRegex.test(value);
                },
                defaultMessage(args: ValidationArguments){
                    return `${args.property} debe estar en formato HH:MM (ej. 14:30)`;
                }
            }
        })
    }
}