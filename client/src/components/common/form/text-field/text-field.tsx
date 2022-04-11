import React, {FC, useCallback, useState} from "react";

type TProps = {
    label: string;
    name: string;
    type?: "text" | "password";
    value: string;
    onChange: (e: any) => void;
    error: string;
}

export const TextField: FC<TProps> = ({label, name, type = "text", value, onChange, error}): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = useCallback(({target}) => {
        onChange({name: target.name, value: target.value})
    }, [onChange])

    const toggleShowPassword = useCallback(() => {
        setShowPassword(prevState => !prevState)
    }, [])

    return (
        <div className="mb-3">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    className={`form-control ${error ? "is-invalid" : "is-valid"}`}
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
                {type === "password" &&
                (<button className="btn btn-outline-secondary" onClick={toggleShowPassword}>
                    <i className={`${showPassword ? "bi bi-eye-slash" : "bi bi-eye"}`}/>
                </button>)}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}