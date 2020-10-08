import { useHistory, useLocation, useParams, useRouteMatch }  from 'react-router-dom';

export const useRouteProps = () => {
    return {
        history: useHistory(),
        location: useLocation(),
        params: useParams(),
        match: useRouteMatch()
    }
}