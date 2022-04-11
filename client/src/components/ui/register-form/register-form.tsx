import React, {useCallback, useEffect, useMemo, useState} from "react";
import {TextField} from "../../common/form/text-field/text-field";
import {IPofObj, IQualityObj} from "../../../types";
import {SelectField} from "../../common/form/select-field/select-field";
import {RadioField} from "../../common/form/radio-field/radio-field";
import {MultiSelectField} from "../../common/form/multi-select-field/multi-select-field";
import {CheckBoxField} from "../../common/form/checkbox-field/checkbox-field";
import {optionsForRadioField} from "../../../api/fake.api/user.api";
import {validator} from "../../../utils/validator";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import {signUp} from "../../../store/users";

export const RegisterForm: React.FC = (): JSX.Element => {
    const dispatch = useDispatch()
    const [data, setData] = useState<{ name: string; email: string; password: string; profession: string; sex: string; qualities: []; license: boolean }>({
        name: "",
        email: "",
        password: "",
        profession: "",
        sex: 'male',
        qualities: [],
        license: false,
    })
    const [errors, setErrors] = useState<{ name: string; email: string; password: string; profession: string; license: string }>({
        name: "",
        email: "",
        password: "",
        profession: "",
        license: "",
    })
    const qualities = useSelector((state: RootState) => state.qualities.entities)
    const qualitiesList = qualities.map((q: IQualityObj) => ({
        label: q.name,
        value: q._id
    }))
    const {entities: professions} = useSelector((state: RootState) => state.professions)
    const professionsList = professions.map((p: IPofObj) => ({
        label: p.name,
        value: p._id
    }))
    const isValid = Object.keys(errors).length === 0

    const validatorConfig = useMemo(() => {
        return {
            name: {
                isRequired: {
                    message: "имя обязателено для заполнения"
                },
                minLength: {
                    message: "имя должено содержать не менее 3 символов",
                    value: 3
                }
            },
            email: {
                isRequired: {
                    message: "email обязателен для заполнения"
                },
                isEmail: {
                    message: "Email введен некорректно"
                }
            },
            password: {
                isRequired: {
                    message: "пароль обязателен для заполнения"
                },
                isCapitalSymbol: {
                    message: "пароль должен содержать не менее одной заглавной буквы"
                },
                isContainDigit: {
                    message: "пароль должен содержать не менее одной цифры"
                },
                minLength: {
                    message: "пароль должен содержать не менее 8 символов",
                    value: 8
                }
            },
            profession: {
                isRequired: {
                    message: "выбор профессии обязателен"
                }
            },
            license: {
                isRequired: {
                    message: "вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
                }
            },
        }
    }, [])

    const validate = useCallback(() => {

        let errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }, [data, validatorConfig])

    const handleChange = useCallback((target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }, [])

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const newData = {
            ...data,
            qualities: data.qualities.map((q: { label: string, value: string }) => q.value)
        }
        dispatch(signUp(newData))
    }, [data, validate])

    useEffect(() => {
        validate()
    }, [data, validate])

    return (
        <form className="form-control" onSubmit={handleSubmit}>
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Выберите вашу профессию"
                defaultOption="Choose..."
                value={data.profession}
                name="profession"
                options={professionsList}
                error={errors.profession}
                onChange={handleChange}
            />
            <RadioField
                label="Ваш пол"
                options={optionsForRadioField}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <MultiSelectField
                label="Ваши качества"
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
                defaultValue={data.qualities}
            />
            <CheckBoxField name="license" value={data.license} onChange={handleChange} error={errors.license}>
                Подтвердить <a href="#">лицензионное соглашение</a>
            </CheckBoxField>
            <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>Submit</button>
        </form>
    )
}