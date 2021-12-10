import { Link } from "react-router-dom";
import cs from "./Home.module.scss";

const Home = () => {
    return (
        <div className="PageWrapper">
            <div>
                <div className={cs.Title}>Home</div>

                <div>
                    <section>
                        <header className={cs.Header}>About</header>
                        <div className={cs.Section__content}>
                            <p className={cs.Paragraph}>
                                <h4 className={cs.Subtitle}>About Mana</h4>
                                Mana is a{" "}
                                <a
                                    className={cs.Link}
                                    href="https://en.wikipedia.org/wiki/Spaced_repetition"
                                >
                                    spaced-repetition
                                </a>{" "}
                                language learning application I built to streamline the
                                language studying I do in my own free time. I built this
                                as an alternative to applications like{" "}
                                <a className={cs.Link} href="https://apps.ankiweb.net/">
                                    Anki
                                </a>
                                . I also see the development of this application as a good
                                test of my full-stack web dev skills. This project can be
                                found on
                                <a
                                    className={cs.Link}
                                    href="https://github.com/seerden/mana"
                                >
                                    my GitHub
                                </a>
                                . Contributions are welcome!
                            </p>
                            <p className={cs.Paragraph}>
                                <h4 className={cs.Subtitle}>Spaced repetition</h4>
                                Spaced-repetition learning principles are quite
                                straightforward: each (vocabulary) term is implemented as
                                a virtual flash card. Learning intervals are chosen based
                                on your preferences, and on how well you know each term.
                                This way, things you know won't come up as often in
                                review, placing the focus on what you <em>don't</em> know,
                                thereby increasing retention, and saving a lot of time.
                            </p>
                        </div>
                    </section>

                    <section>
                        <header className={cs.Header}>Register</header>
                    </section>
                    <p className={cs.Section__content}>
                        <span>
                            If you're ready to make an account,{" "}
                            <Link className={cs.Link} to="/register">
                                click here to register
                            </Link>
                            . It's free, and we don't need any personal information.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
