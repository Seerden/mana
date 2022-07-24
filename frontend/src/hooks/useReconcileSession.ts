import { useEffect } from "react";
import useLogout from "../gql/hooks/user/useLogout";
import { useQueryMe } from "../gql/hooks/user/useQueryMe";
import { useLogin } from "./useLogin";

export default function useReconcileSession() {
	const { mutate: mutateLogout } = useLogout();
	const { currentUser, isLoggedIn, login, logout } = useLogin();

	const { refetch } = useQueryMe({
		onSuccess: (me) => {
			if (!me) {
				if (isLoggedIn) {
					// If query doesn't return a user, force logout server-side to clean up.
					mutateLogout(null, {
						// On successful server-side logout, log-out client-side.
						onSuccess: () => {
							logout();
						},
					});
				}
			}

			if (!isLoggedIn || me.username !== currentUser) {
				return login(me.username);
			}
		},
	});

	useEffect(() => {
		refetch();
	}, []);
}
