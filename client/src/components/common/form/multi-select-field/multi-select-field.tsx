import React, {useCallback} from "react";
import Select from "react-select";

type TProps = {
    options: any;
    onChange: (e: any) => void;
    name: string;
    label: string;
    defaultValue: any;
}

export const MultiSelectField: React.FC<TProps> = ({label, defaultValue, options, name, onChange}): JSX.Element => {

    const optionsArray = !Array.isArray(options) && typeof options === "object"
        ? Object.keys(options).map(optionName => ({
            label: options[optionName].name,
            value: options[optionName]._id
        }))
        : options

    const handleChange = useCallback((value) => {
        onChange({name: name, value})
    }, [onChange, name])

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
                defaultValue={defaultValue}
            />
        </div>
    )
}