import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Lands from "./pages/Lands";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./hooks/useAuth";
import Protected from "./components/Protected";
import Users from "./pages/Users";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<Routes>
						<Route path='/signin' element={<Signin />} />
						<Route path='/' element={<Home />} />
						<Route path='/users' element={<Users />} />
						<Route
							path='/lands'
							element={
								<Protected>
									<Lands />
								</Protected>
							}
						/>
						<Route
							path='/profile'
							element={
								<Protected>
									<Profile />
								</Protected>
							}
						/>
					</Routes>
				</AuthContextProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;
