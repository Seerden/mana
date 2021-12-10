import { useLocation, useNavigate, useParams } from "react-router-dom";

/**
 * Hook that returns location(), useNavigate() and useParams() as a single object
 */
export const useRouteProps = () => {
    return {
        location: useLocation(),
        navigate: useNavigate(),
        params: useParams(),
    };
};
