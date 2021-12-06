export function getUserFromLocalStorage() {
	return localStorage.getItem("username");
}

export function putUserInLocalStorage(username: string) {
	localStorage.setItem("username", username);
}

export function removeUserFromLocalStorage() {
	localStorage.removeItem("username");
}
