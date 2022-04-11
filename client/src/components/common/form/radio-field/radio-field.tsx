import React, {useCallback} from "react";
import {TGender} from "../../../../types";

type TProps = {
    options: Array<TGender>;
    name: string;
    onChange: (e: any) => void;
    value: string;
    label: string;
}

export const RadioField: React.FC<TProps> = ({options, value, name, label, onChange}): JSX.Element => {

    const handleChange = useCallback(({target}) => {
        onChange({name: target.name, value: target.value})
    }, [onChange])

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div>
                {options.map(option => (
                    <div key={option.name + "_" + option.value} className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            id={option.name + "_" + option.value}
                            value={option.value}
                            onChange={handleChange}
                            checked={option.value === value}
                        />
                        <label className="form-check-label"
                               htmlFor={option.name + "_" + option.value}>{option.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}