import React, {FC, useCallback, useState} from "react";
import {useParams} from "react-router-dom";
import {LoginForm} from "../../components/ui/login-form/login-form";
import {RegisterForm} from "../../components/ui/register-form/register-form";

export const LoginPage: FC = (): JSX.Element => {
    const {type} = useParams<{ type?: string }>()
    const [formType, setFormType] = useState<"login" | "register">(type === "register" ? type : "login")

    const toggleType = useCallback(() => {
        setFormType(prevState => prevState === "login" ? "register" : "login")
    }, [])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-5 shadow">
                    {formType === "login"
                        ? (<>
                            <h3 className="text-center mb-4">Вход</h3>
                            <LoginForm/>
                            <p className="text-center mt-4">Нет аккаунта?&nbsp;<a role="button" onClick={toggleType} style={{color: "blue"}}>Регистрация</a></p>
                        </>)
                        : (<>
                            <h3 className="text-center mb-4">Регистрация</h3>
                            <RegisterForm/>
                            <p className="text-center mt-4">Есть аккаунт?&nbsp;<a role="button" onClick={toggleType} style={{color: "blue"}}>Вход</a></p>
                        </>)}
                </div>
            </div>
        </div>
    )
}