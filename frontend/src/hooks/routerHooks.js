import { useNavigate, useLocation, useParams }  from 'react-router-dom';

/**
 * Hook that returns location(), useNavigate() and useParams() as an obejct
 */
export const useRouteProps = () => {
    return ({
        location: useLocation(),
        navigate: useNavigate(),
        params: useParams(),
    })
}