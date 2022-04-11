import React, {useCallback} from "react";

type TProps = {
    name: string;
    value: boolean;
    error?: string;
    onChange: (e: any) => void;
}

export const CheckBoxField: React.FC<TProps> = ({name, value, error, onChange, children}): JSX.Element => {
    const handleChange = useCallback(() => {
        onChange({name: name, value: !value})
    }, [name, value, onChange])

    return (
        <div className="form-check mb-4">
            <input
                className="form-check-input"
                type="checkbox"
                value=""
                name={name}
                onChange={handleChange}
                id={name}
                checked={value}
            />
            <label className={`form-check-label ${error && 'is-invalid'}`} htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}