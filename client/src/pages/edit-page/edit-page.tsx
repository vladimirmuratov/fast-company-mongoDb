import React from "react";
import {EditForm} from "../../components/ui/edit-form/edit-form";
import {GoBackIcon} from "../../components/common/go-back-icon/go-back-icon";

export const EditPage: React.FC = (): JSX.Element => {

    return (
        <div>
            <GoBackIcon/>
            <EditForm />
        </div>
    )
}