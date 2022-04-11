import React, {SyntheticEvent, useCallback, useEffect, useMemo, useState} from "react";
import {TextAreaField} from "../../common/form/text-area-field/text-area-field";
import {validator} from "../../../utils/validator";
import {nanoid} from "nanoid";
import {createComment} from "../../../store/comments";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import {useParams} from "react-router-dom";

export const AddCommentForm: React.FC = (): JSX.Element => {
    const dispatch = useDispatch()
    const {id: userId} = useParams<{ id: string }>()
    const {currentUser} = useSelector((state: RootState) => state.users)
    const [data, setData] = React.useState<{ content: string }>({content: ""})
    const [errors, setErrors] = useState({content: ""})
    const isValid = Object.keys(errors).length === 0

    const handleChange = (e: any) => {
        setData(prevState => ({
            ...prevState,
            [e.name]: e.value
        }))
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const payload = {
            userId: currentUser._id,
            pageId: userId,
            content: data.content
        }
        dispatch(createComment(payload))
        setData({content: ""})
    }

    const validatorConfig = useMemo(() => {
        return {
            content: {
                isRequired: {
                    message: "комментарий обязателен для заполнения"
                }
            }
        }
    }, [])

    const validate = useCallback(() => {
        let errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }, [data, validatorConfig])

    useEffect(() => {
        validate()
    }, [data, validate])

    return (
        <div className="card mb-2">
            <form className="card-body" onSubmit={handleSubmit}>
                <h2>New comment</h2>
                <hr/>
                <TextAreaField
                    name="content"
                    data={data.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <button type="submit" className="btn btn-primary" disabled={!isValid}>Опубликовать</button>
            </form>
        </div>
    )
}