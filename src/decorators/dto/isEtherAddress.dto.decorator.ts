import { registerDecorator, ValidationOptions } from 'class-validator';
import { ethers } from 'ethers';

export const IsEtherAddress = (
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  return (object: any, propertyName: string): any => {
    registerDecorator({
      name: 'IsEtherAddress',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: 'ether address is invalid',
      } as ValidationOptions,
      validator: {
        validate: (value: any): boolean => {
          return ethers.utils.isAddress(value);
        },
      },
    });
  };
};
