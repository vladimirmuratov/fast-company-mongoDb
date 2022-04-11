import React, {FC} from "react";

type TProps = {
    number: number | undefined;
    renderPhrase: (number: number) => void;
}

export const SearchStatus: FC<TProps> = ({number, renderPhrase}): JSX.Element => (
    <h2>
        <span
            className={"badge bg-" + (number && number > 0 ? "primary" : "danger")}
        >
            {number && number > 0
                ? `${number} ${renderPhrase(number)} с тобой сегодня`
                : "Никто с тобой не тусанет"
            }
        </span>
    </h2>
)