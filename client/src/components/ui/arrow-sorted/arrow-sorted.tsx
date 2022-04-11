import React, {FC} from "react";

type TProps = {
    order: "asc" | "desc";
}

export const ArrowSorted: FC<TProps> = ({order}): JSX.Element => (
    <>
        {order === "asc" && <i className="bi bi-caret-up-fill"/>}
        {order === "desc" && <i className="bi bi-caret-down-fill"/>}
    </>
)