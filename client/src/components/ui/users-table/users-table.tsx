import React, {FC} from "react";
import {ISortItem, IUser} from "../../../types";
import {TableHeader} from "../../common/table-folder/table-header/table-header";
import {TableBody} from "../../common/table-folder/table-body/table-body";
import {Bookmark} from "../../common/bookmark/bookmark";
import {QualitiesList} from "../qualities/qualities-list/qualities-list";
import {Table} from "../../common/table-folder/table/table";
import {Profession} from "../profession/profession";

type TProps = {
    usersOnPage: Array<IUser>;
    onBookmark: (id: string) => void;
    onSort: (item: ISortItem) => void;
    selectedSort: ISortItem
}

export const UsersTable: FC<TProps> = ({usersOnPage, selectedSort, onSort, onBookmark, ...rest}): JSX.Element => {

    const columns: any = {
        name: {path: "name", name: "Имя"},
        qualities: {
            name: "Качества",
            component: (user: IUser) => <QualitiesList qualities={user.qualities}/>
        },
        profession: {name: "Профессия", component: (user: IUser) => <Profession id={user.profession}/>},
        completedMeetings: {path: "completedMeetings", name: "Встретился, раз"},
        rate: {path: "rate", name: "Оценка"},
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user: IUser) => <Bookmark status={user.bookmark} onClick={() => onBookmark(user._id)}/>
        }
    }

    return (
        <Table>
            <TableHeader {...{onSort, selectedSort, columns}} />
            <TableBody {...{columns, data: usersOnPage}}/>
        </Table>
    )
}