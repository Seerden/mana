import UserSessions from "components/sessions/UserSessions";
import { useRouteProps } from "../../hooks/routerHooks";
import cs from "./User.module.scss";

const User = () => {
    const { params } = useRouteProps();
    const username = params.username;

    return (
        <div className="PageWrapper">
            <div className="User">
                <div className={cs.Title}>/u/{username}'s profile</div>
            </div>

            <section>
                <UserSessions />
            </section>
        </div>
    );
};

export default User;
