import React from "react";

type TProps = {
    color: string;
    name: string;
}

export const Quality: React.FC<TProps> = ({color, name}): JSX.Element => (
    <span className={"badge m-1 bg-" + color}>{name}</span>
)