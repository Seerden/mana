import { Location } from "react-router-dom";

export function isActive(to: string, location: Location) {
	return to === location.pathname;
}
