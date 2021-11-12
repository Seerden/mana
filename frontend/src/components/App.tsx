import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Private from "../wrappers/Private";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ReviewPage from "components/review/ReviewPage/ReviewPage";
import List from "./list/List";
import Lists from "./lists/Lists";
import NewList from "./newlist/NewList";
import Home from "./Home/Home";
import Register from "./register/Register";
import Login from "./login/Login";
import User from "components/user/User";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				cacheTime: 0,
				refetchOnWindowFocus: false,
			},
		},
	});

	return (
		<>
			<QueryClientProvider client={client}>
				<RecoilRoot>
					<div className="App__wrapper">
						<Router>
							<Header />
							<div className="App">
								<Routes>
									{/* home route */}
									<Route path="/" element={<Home />} />

									<Route path="register" element={<Register />} />
									<Route path="login" element={<Login />} />

									{/* user routes */}
									<Route path="u/:username">
										<Route
											index
											element={
												<Private>
													<User />
												</Private>
											}
										/>

										{/* Routes related to multiple lists */}
										<Route path="lists">
											<Route
												index
												element={
													<Private>
														<Lists />
													</Private>
												}
											/>

											<Route
												path="new"
												element={
													<Private>
														<NewList />
													</Private>
												}
											/>
										</Route>

										{/* Routes related to individual list */}
										<Route path="list">
											<Route path=":id">
												<Route
													index
													element={
														<Private>
															<List />
														</Private>
													}
												/>
												<Route
													path="review"
													element={
														<Private>
															<ReviewPage />
														</Private>
													}
												/>
											</Route>
										</Route>
									</Route>

									{/* catchall 404 route */}
									<Route path="*" element={<div>404</div>} />
								</Routes>
							</div>
							<Footer />
						</Router>
					</div>
				</RecoilRoot>
			</QueryClientProvider>
		</>
	);
};

export default App;
