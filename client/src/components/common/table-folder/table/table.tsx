import React, {FC} from "react";

export const Table: FC = ({children}): JSX.Element => (
    <table className="table">
        {children}
    </table>
)