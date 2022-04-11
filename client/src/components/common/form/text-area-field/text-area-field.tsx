import React, {FC, useCallback} from "react";

type TProps = {
    name: string;
    data: string;
    onChange: (e: {name: string, value: string}) => void;
    error: string;
}

export const TextAreaField: FC<TProps> = ({name, data, onChange, error}): JSX.Element => {

    const handleChange = useCallback(({target}) => {
        onChange({name: target.name, value: target.value})
    }, [onChange])

    return (
        <>
            <label htmlFor={name}>сообщение</label>
            <div className="input-group has-validation mb-3">
            <textarea
                className={`form-control ${error && "is-invalid"}`}
                id={name}
                name={name}
                value={data}
                onChange={handleChange}
                rows={3}
            />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    )
}