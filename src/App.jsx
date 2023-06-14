import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./hooks/useAuth";
import Protected from "./components/Protected";
function App() {
	return (
		<>
			<AuthContextProvider>
				<Routes>
					<Route path='/signin' element={<Signin />} />
					<Route path='/' element={<Home />} />
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
		</>
	);
}

export default App;
