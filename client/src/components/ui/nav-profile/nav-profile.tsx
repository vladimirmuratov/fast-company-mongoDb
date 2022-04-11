import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";

export const NavProfile: React.FC = (): JSX.Element => {
    const [isOpen, setOpen] = useState(false)
    const {currentUser}: any = useSelector((state:RootState) => state.users)

    const toggleMenu = () => setOpen(prevState => !prevState)

    return (
        <div className="dropdown me-2" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser?.name}</div>
                <img
                    className="img-responsive rounded-circle"
                    src={currentUser?.image}
                    height="40"
                    alt="avatar"
                />
            </div>
            <div className={`w-100 dropdown-menu ${isOpen && `show`}`}>
                <Link to={`/users/${currentUser?._id}`} className="dropdown-item">Profile</Link>
                <Link to="/logout" className="dropdown-item">Log Out</Link>
            </div>
        </div>
    )
}