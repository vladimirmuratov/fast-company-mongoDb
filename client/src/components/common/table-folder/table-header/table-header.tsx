import React, {FC, useCallback} from "react";
import {ISortItem} from "../../../../types";
import {ArrowSorted} from "../../../ui/arrow-sorted/arrow-sorted";

type TProps = {
    selectedSort: ISortItem;
    onSort: (item: ISortItem) => void;
    columns: any;
}

export const TableHeader: FC<TProps> = ({selectedSort, onSort, columns}): JSX.Element => {
    const handleSort = useCallback((item) => {
        if (item === selectedSort.path) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            })
        } else {
            onSort({
                path: item,
                order: "asc"
            })
        }
    }, [selectedSort, onSort])
    return (
        <thead>
        <tr>
            {Object.keys(columns).map(column => (
                <th
                    style={{textAlign: "center"}}
                    key={column}
                    onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
                    scope="col"
                    {...{role: columns[column].path && "button"}}
                >
                    {columns[column].name}
                    {selectedSort.path === columns[column].path && <ArrowSorted order={selectedSort.order}/>}
                </th>
            ))}
        </tr>
        </thead>
    )
}