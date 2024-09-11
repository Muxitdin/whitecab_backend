import passwordComplexity from "joi-password-complexity"

const validatePassword = (password) => {
    const schema = passwordComplexity({
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 2,
    })
    const { error } = schema.validate(password)

    if (error) {
        const errorMessages = error.details.map((detail) => {
            switch (detail.type) {
                case "passwordComplexity.tooShort":
                    return "Пароль слишком короткий. Минимальная длина 8 символов"
                case "passwordComplexity.tooLong":
                    return "Пароль слишком длинный. Максимальная длина 30 символов"
                case "passwordComplexity.lowercase":
                    return "Пароль должен содержать хотя бы одну строчную букву"
                case "passwordComplexity.uppercase":
                    return "Пароль должен содержать хотя бы одну заглавную букву"
                case "passwordComplexity.numeric":
                    return "Пароль должен содержать хотя бы одну цифру"
                case "passwordComplexity.symbol":
                    return "Пароль должен содержать хотя бы один специальный символ"
                default:
                    return "Пароль не соответствует требованиям к сложности"
            }
        })
        return { valid: false, errors: errorMessages }
    }
    return { valid: true }
}

export default validatePassword