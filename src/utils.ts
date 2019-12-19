import { ObjectType, EntitySchema, getRepository } from 'typeorm';
import { ValidationOptions, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export function getSingleBy<T = any>(
    table: ObjectType<T> | EntitySchema<T>,
): (filter: Partial<T>) => Promise<T> {
    return async (filter) => {
        const record = await getRepository(table).findOne({ where: filter });
        return record;
    };
}

export function getManyBy<T = any>(
    table: ObjectType<T> | EntitySchema<T>,
): (filter: Partial<T>) => Promise<T[]> {
    return async (filter) => {
        const result = await getRepository(table).find({ where: filter });
        return result;
    };
}

export function decoratorBundle(validators: any[]) {
    return () => {
        return (object: object, propertyName: string) => {
            for (const validator of validators) {
                // tslint:disable-next-line: no-unused-expression
                new validator(object, propertyName);
            }
        };
    };
}

export const Nested = (type: any, validationOptions?: ValidationOptions) =>
    decoratorBundle([ValidateNested(validationOptions), Type (() => type)])();

export const NestedArray = (type: any) => Nested(type, { each: true });
