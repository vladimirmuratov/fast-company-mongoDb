import React, {FC} from "react";

type TProps = {
    value: string;
    onChange: (value: string) => void;
}

export const SearchField: FC<TProps> = ({value, onChange}): JSX.Element => {
    return (
        <input className="form-control w-50" value={value} placeholder="Search..."
               onChange={(e) => onChange(e.target.value)}/>
    )
}