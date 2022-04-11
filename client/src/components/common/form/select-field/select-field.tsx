import React, {useCallback} from "react";

type TProps = {
    label?: string;
    defaultOption: string;
    value: any;
    name: string;
    options: any;
    error: string;
    onChange: (e: any) => void;
}

export const SelectField: React.FC<TProps> = ({label="", defaultOption, value, name, options, error, onChange}): JSX.Element => {

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                label: options[optionName].name,
                value: options[optionName]._id
            }))
            : options

    const handleChange = useCallback(({target}) => {
        onChange({name: target.name, value: target.value})
    }, [onChange])

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <select
                id={name}
                className={`form-select ${error ? "is-invalid" : ""}`}
                aria-label="Default select example"
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">{defaultOption}</option>
                {optionsArray?.map((profession: {value: string; label: string;}) => (
                        <option key={profession.value} value={profession.value}>{profession.label}</option>
                    )
                )}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}