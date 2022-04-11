import React, {FC} from "react";

type TProps = {
    onDelete: (id: string) => void;
    id: string;
}

export const DeleteButton: FC<TProps> = ({onDelete, id}): JSX.Element => (
    <button
        className={"btn btn-danger"}
        onClick={() => onDelete(id)}
    >
        Удалить
    </button>
)