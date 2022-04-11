import React from "react";
import {Link} from "react-router-dom";
import {NavProfile} from "../nav-profile/nav-profile";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";

export const Navbar: React.FC = (): JSX.Element => {
    const {isLoggedIn} = useSelector((state: RootState) => state.users)

    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" aria-current="page">Main</Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link to="/users" className="nav-link" aria-current="page">Users</Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn
                        ? <NavProfile/>
                        : <Link to="/login" className="nav-link" aria-current="page">Login</Link>
                    }

                </div>
            </div>
        </nav>
    )
}