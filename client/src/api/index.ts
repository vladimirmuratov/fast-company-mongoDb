import users from "./fake.api/user.api";
import professions from "./fake.api/professions.api";
import qualities from "./fake.api/qualities.api";


type TApi = {
    users: any;
    professions: any;
    qualities: any;
}

const API: TApi = {
    users,
    professions,
    qualities,
};
export default API;
