import { checkSchema } from "express-validator"


export const validateNewProductBody = checkSchema({
    name: {
        isString: true,
        rtrim: {
            options: ' ',
        },
        isLength: {
            options: {
                min: 2,
            }
        },
        errorMessage: "name must be a valid string with at least 2 character"
    },
    year: {
        isInt: true,
        isString: {
            negated: true
        },
        errorMessage: "year must be an integer"
        /*customSanitizer: {
            options: (value) => {
                return parseInt(value)
            }
        }*/
    },
    price: {
        isNumeric: true,
        isString: {
            negated: true,
        },
        custom: {
            options: (value: number) => {
                return value > 0
            }
        },
        errorMessage: "price must be a numeric value > 0"
    }
})