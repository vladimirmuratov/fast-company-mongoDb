import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import {TextField} from "../../common/form/text-field/text-field";
import {CheckBoxField} from "../../common/form/checkbox-field/checkbox-field";
import {validator} from "../../../utils/validator";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../store/users";
import {Redirect, useHistory} from "react-router-dom";
import {RootState} from "../../../store/createStore";

export const LoginForm: FC = (): JSX.Element => {
    const dispatch = useDispatch()
    const history: any = useHistory()
    const [data, setData] = useState<{ email: string, password: string, stayOn: boolean }>({
        email: "",
        password: "",
        stayOn: false
    })
    const [errors, setErrors] = useState<{ email: string, password: string }>({email: "", password: ""})
    const {error: loginError} = useSelector((state: RootState) => state.users)
    const isValid = Object.keys(errors).length === 0

    const validatorConfig = useMemo(() => {
        return {
            email: {
                isRequired: {
                    message: "email обязателен для заполнения"
                },
                isEmail: {
                    message: "email введен некорректно"
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
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/"
        dispatch(login({payload: data, redirect}))
    }, [data, validate])

    useEffect(() => {
        validate()
    }, [data, validate])

    const {isLoggedIn} = useSelector((state: RootState) => state.users)
    if (isLoggedIn) {
        return <Redirect to="/"/>
    }

    return (
        <form className="form-control" onSubmit={handleSubmit}>
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
                error={errors?.password}
            />
            <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>Submit</button>
        </form>
    )
}