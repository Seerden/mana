import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getSets } from "helpers/apiHandlers/setHandlers";
import { useRouteProps } from "hooks/routerHooks";
import { useRequest } from "hooks/useRequest";
import SetCard from './SetCard';
import PageInfo from '../_shared/PageInfo';
import './style/Sets.scss'


const Sets = (props) => {
    const { params } = useRouteProps(),
        { response: sets, setRequest } = useRequest({});

    useEffect(() => {  // retrieve the user's sets on component load
        setRequest(() => getSets(params.username, { owner: params.username }))
    }, [])

    return (
        <div className="PageWrapper">
            <div className="Sets">
                <header className="PageHeader">
                    Sets by <Link className="Link" to={`/u/${params.username}`}>/u/{params.username}</Link>
                </header>

                <section className="Banner__link">
                    <Link className="Sets__link" to="new">New Set</Link>
                    <PageInfo>
                        All your sets are displayed here. Click on one of the set cards to be taken to the set's page, 
                        where you're given a full view of the set's history, status, and from where you can specify your review settings.
                    </PageInfo>
                </section>


                { sets && 
                    <section className="Sets__sets">
                        {sets.map(set => <SetCard key={set._id} set={set} />)}
                    </section>
                }
            </div>
        </div>
    )
}

export default Sets