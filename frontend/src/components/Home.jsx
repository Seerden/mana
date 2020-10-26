import React from "react";
import { Link } from 'react-router-dom';
import './Home.css';

const Home = (props) => {

    return (
        <div className="PageWrapper">
            <div className="Home">
                <div className="PageHeader">
                    Home
                </div>

                <div className="Home__description">
                    <section>
                        <header className="Home__header">About</header>
                        <p className="Home__paragraph">
                            <div>
                                Mana is a <a className="Home__link" href="https://en.wikipedia.org/wiki/Spaced_repetition">spaced-repetition</a> language learning application I built to streamline the language studying I do in my own free time,
                                but of course anyone who shares my studying mindset and can benefit from this application is welcome to partake!</div>
                            <div>
                                Spaced-repetition learning principles are quite straightforward: each (vocabulary) term is implemented as a virtual flash card. Learning intervals are chosen based on your preferences, and on how well you know each term.
                                This way, things you know won't come up as often in review, placing the focus on what you <em>don't</em> know, thereby increasing retention, and saving a lot of time.


                            </div>
                            <div>
                                Besides the benefits of having an application made specifically for my learning preferences, building the application has served me very well in refining my web development skillset, and hence the project has become one my fullstack web development portfolio projects.
                                The source code is available on my <a className="Home__link" href="https://github.com/seerden/mana">GitHub</a>.
                            </div>
                        </p>
                    </section>

                    <section>
                        <header className="Home__header">Getting started</header>
                        <p className="Home__paragraph">
                            <div>
                                If you're just taking a look at the application, please click <a className="Home__link" href="#">here</a> to be logged in as a temporary user.
                                You'll see a number of lists having been created already, including some review activity, so you can fully explore the functionality the application has to offer.
                                Changes you make will persist to the database, but the temporary account and all its content will be removed after two hours.

                                If you like what you've experienced within that time, go ahead and make an actual account!
                            </div>


                        </p>
                    </section>
                    <section>
                        <header className="Home__header">
                            Register
                        </header>
                    </section>
                    <p className="Home__paragraph">
                        <div>
                            If you're ready to make an account, click <Link className="Home__link" to="/register">here</Link> to register. It's free, and no personal information will be requested or stored.
                        </div>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Home