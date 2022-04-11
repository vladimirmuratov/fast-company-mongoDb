type TConfig = {
    [index: string]: any;
}

export function validator(data: any, config: TConfig) {
    const errors: any = {}

    function validate(validateMethod: string, data: string, config: TConfig) {
        let statusValidate
        switch (validateMethod) {
            case "isRequired":
                if (typeof data === "boolean") {
                    statusValidate = !data
                } else {
                    statusValidate = data.trim() === ""
                }
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g
                statusValidate = !emailRegExp.test(data)
                break;
            }
            case "isCapitalSymbol": {
                const capitalSymbolRegExp = /[A-Z]+/g
                statusValidate = !capitalSymbolRegExp.test(data)
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g
                statusValidate = !digitRegExp.test(data)
                break;
            }
            case "minLength": {
                statusValidate = data.length < config.value
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message
    }

    for (let fieldName in data) {
        for (let validateMethod in config[fieldName]) {
            // @ts-ignore
            const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod])
            if (error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        }
    }

    return errors
}