import React, {useEffect, useState} from "react";
import {TextField} from "../../common/form/text-field/text-field";
import {SelectField} from "../../common/form/select-field/select-field";
import {RadioField} from "../../common/form/radio-field/radio-field";
import {MultiSelectField} from "../../common/form/multi-select-field/multi-select-field";
import {validator} from "../../../utils/validator";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import {getUserById, loadUsersList, updateUser} from "../../../store/users";
import {Loader} from "../../common/loader/loader";
import {useParams} from "react-router-dom";

export const EditForm: React.FC = (): JSX.Element => {
    const {id} = useParams<any>()
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<{ name: string; qualities: any; email: string; profession: any; sex: string }>({
        name: "",
        qualities: [],
        email: "",
        profession: "",
        sex: ""
    });
    const currentUser = useSelector(getUserById(id))
    const dispatch = useDispatch();
    const {entities: qualities} = useSelector((state: RootState) => state.qualities);
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const {entities: professions} = useSelector((state: RootState) => state.professions);
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const [errors, setErrors] = useState<{ name: string, email: string, profession: string }>({
        name: "",
        email: "",
        profession: ""
    })

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            updateUser({
                ...data,
                qualities: data.qualities.map((q: any) => q.value)
            })
        )
        dispatch(loadUsersList())
    };

    function getQualitiesListByIds(qualitiesIds: any) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    const transformData = (data: any) => {
        const result = getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
        return result;
    };
    useEffect(() => {
        if (currentUser) {
            setData({
                ...currentUser,
                qualities: currentUser.qualities ? transformData(currentUser.qualities) : []
            });
        }
    }, [currentUser]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate()
    }, [data]);
    const handleChange = (target: any) => {
        setData((prevState: any) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    {name: "Male", value: "male"},
                                    {name: "Female", value: "female"},
                                    {name: "Other", value: "other"}
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        <Loader/>
                    )}
                </div>
            </div>
        </div>
    );
};
