import React, {FC} from "react";
import _ from "lodash";

type TProps = {
    items: number | undefined;
    pageSize: number;
    handleCurrentPage: (index: number) => void;
    currentPage: number;
}

export const Pagination: FC<TProps> = ({items, pageSize, currentPage, handleCurrentPage}): JSX.Element => {
    const pagesCount = items && Math.ceil(items / pageSize)
    if (pagesCount === 1) return <></>

    const pages = pagesCount && _.range(1, pagesCount + 1)

    return (
        <>
            {pagesCount !== 0 &&
                (<nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {pages && pages.map(page => (
                            <li key={page} className={currentPage === page ? "page-item active" : "page-item"}>
                                <button className="page-link" onClick={() => handleCurrentPage(page)}>{page}</button>
                            </li>
                        ))}
                    </ul>
                </nav>)
            }
        </>
    )
}