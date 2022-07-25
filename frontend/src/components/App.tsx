import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import User from "components/user/User";
import { QueryClientProvider } from '@tanstack/react-query';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from "../helpers/theme/theme";
import useQueryClient from "../hooks/useQueryClient";
import Private from "../wrappers/Private";
import * as S from "./App.style";
import Home from "./Home/Home";
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import List from "./list/List";
import Lists from "./lists/Lists";
import Login from "./login/Login";
import NewList from "./newlist/NewList";
import Register from "./register/Register";

const App = () => {
	const [client] = useQueryClient();

	return (
		<>
			<QueryClientProvider client={client}>
				<ReactQueryDevtools initialIsOpen={false} />
				<RecoilRoot>
					<S.App>
						<ThemeProvider theme={theme}>
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
												</Route>
											</Route>
										</Route>

										{/* catchall 404 route */}
										<Route path="*" element={<div>404</div>} />
									</Routes>
								</div>
								<Footer />
							</Router>
						</ThemeProvider>
					</S.App>
				</RecoilRoot>
			</QueryClientProvider>
		</>
	);
};

export default App;
