import React, {FC} from "react";
import styles from './bookmark.module.css';

type TProps = {
    status: boolean;
    onClick: () => void;
}

export const Bookmark: FC<TProps> = ({status, onClick}): JSX.Element => (
    <span
        className={styles.bookmark}
        onClick={onClick}
    >
        <i className={status ? "bi bi-bookmark-fill" : "bi bi-bookmark"}/>
    </span>
)