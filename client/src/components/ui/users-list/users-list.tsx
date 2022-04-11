import React, {FC, useCallback, useEffect, useState} from "react";
import _ from "lodash";
import {SearchStatus} from "../search-status/search-status";
import {IPofObj} from "../../../types";
import {Pagination} from "../../common/pagination/pagination";
import {GroupList} from "../../common/group-list/group-list";
import {UsersTable} from "../users-table/users-table";
import {SearchField} from "../../common/search-field/search-field";
import {paginate} from "../../../utils/paginate";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";

const UsersList: FC = (): JSX.Element => {
    const {currentUser} = useSelector((state: RootState) => state.users)
    const {entities: professions} = useSelector((state: RootState) => state.professions)
    const {entities: users} = useSelector((state: RootState) => state.users)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedProf, setSelectedProf] = useState<IPofObj>()
    const [sortBy, setSortBy] = useState<{ path: "name" | "profession" | "completedMeetings" | "rate" | "bookmark", order: "asc" | "desc" }>({
        path: "name",
        order: "asc"
    })
    const [valInput, setValInput] = useState('')
    const [searchUsers, setSearchUsers] = useState<any>()

    const getProfession = useCallback((id) => {
        const profession = professions.find(p => p._id === id)
        return profession?.name
    }, [professions])

    const handleDelete = useCallback((userId: string) => {
        // setUsers(users-list?.filter((user) => user._id !== userId))
    }, [users])

    const renderPhrase = (number: number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "Человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "Человека тусанут";
        if (lastOne === 1) return "Человек тусанет";
        return "Человек тусанет";
    };

    const handleBookmark = (id: string) => {
        const updatedUsers = users?.map((user: { _id: string; bookmark: any; }) => {
            if (user._id === id) {
                return {...user, bookmark: !user.bookmark}
            } else {
                return user
            }
        })
    }

    const usersCount = users?.length
    const pageSize = 4

    const handleSort = useCallback((item) => {
        setSortBy(item)
    }, [])

    const handleClearCurrentProf = useCallback(() => {
        setSelectedProf(undefined)
    }, [])

    const handleFilteredUsers = useCallback(() => {
        if (selectedProf) {
            // @ts-ignore
            return users?.filter((user) => getProfession(user.profession) === selectedProf)
        }
    }, [selectedProf, users])

    const handleCurrentProf = useCallback((item) => {
        setSelectedProf(item.name)
        setCurrentPage(1)
        setValInput('')
    }, [])

    const handleCurrentPage = useCallback((index) => {
        setCurrentPage(index)
    }, [])

    useEffect(() => {
        if (valInput.length) handleClearCurrentProf()
        const searchedUsers = users && users.filter((user) => user.name.toLowerCase().includes(valInput.toLowerCase()))
        setSearchUsers(searchedUsers)
    }, [users, valInput, handleClearCurrentProf])

    let filteredUsers = handleFilteredUsers() || searchUsers || users

    // Удаляем текущего юсера из таблицы
    filteredUsers = filteredUsers?.filter((user: any) => user._id !== currentUser?._id)
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const usersOnPage = filteredUsers && paginate(sortedUsers, currentPage, pageSize)

    return (
        <>
            <SearchStatus number={users?.length - 1} renderPhrase={renderPhrase}/>
            <SearchField value={valInput} onChange={setValInput}/>
            <div className="d-flex align-items-start">
                <GroupList
                    onCurrentProf={handleCurrentProf}
                    currentProf={selectedProf}
                    onClear={handleClearCurrentProf}
                />
                {usersOnPage && usersOnPage.length > 0
                    ? (<UsersTable
                        usersOnPage={usersOnPage}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onBookmark={handleBookmark}
                    />)
                    : <h1>Никого нет...</h1>
                }
            </div>
            <div className="d-flex justify-content-center">
                <Pagination
                    items={filteredUsers ? filteredUsers.length : usersCount} pageSize={pageSize}
                    currentPage={currentPage}
                    handleCurrentPage={handleCurrentPage}
                />
            </div>
        </>
    )
}

export default UsersList;
