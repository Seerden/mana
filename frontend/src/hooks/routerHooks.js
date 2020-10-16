import { useNavigate, useLocation, useParams }  from 'react-router-dom';

export const useRouteProps = () => {
    return ({
        location: useLocation(),
        navigate: useNavigate(),
        params: useParams(),
    })
}