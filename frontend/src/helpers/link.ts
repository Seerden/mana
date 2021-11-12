import { Location } from "react-router-dom";

export function isActive(to: string, location: Location) {
	if (to === location.pathname) {
		return true;
	}
	return false;
}
