import React, {FC, useCallback} from "react";
import _ from "lodash";
import {IUser} from "../../../../types";
import {Link} from "react-router-dom";

type TProps = {
    data: Array<IUser>;
    columns: any;
}

export const TableBody: FC<TProps> = ({data, columns}): JSX.Element => {

    const renderContent = useCallback((item, column) => {
        if (columns[column].component) {
            const component = columns[column].component
            if (typeof component === "function") {
                return component(item)
            }
            return component
        }
        return _.get(item, columns[column].path)
    }, [columns])

    return (
        <tbody>
        {data.map(item => (
            <tr key={item._id}>
                {Object.keys(columns).map(column => (
                    <td style={{textAlign: "center"}} key={column}>{column === "name" ? <Link to={`/users/${item._id}`}>{renderContent(item,
                        column)}</Link> : renderContent(item, column)}</td>
                ))}
            </tr>
        ))}
        </tbody>
    )
}