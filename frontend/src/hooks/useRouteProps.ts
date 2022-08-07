import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

/**
 * Hook that returns location(), useNavigate() and useParams() as a single object
 */
const useRouteProps = () => {
	return {
		location: useLocation(),
		navigate: useNavigate(),
		params: useParams(),
		search: useSearchParams()[0],
	};
};

export default useRouteProps;
