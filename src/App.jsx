import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./hooks/useAuth";
import Protected from "./components/Protected";
import Users from "./pages/Users";
import { QueryClient, QueryClientProvider } from "react-query";
import LandLeaseService from "./pages/landleaseservice";
import WorkInProgress from "./components/workinprogress";
import Dashboard from "./pages/LandLeaseDashboard";
// import { LandLeaseProvider } from "./pages/LandLeaseContext";
import SellProductService from "./pages/SellProduct";
import SellProductDashboard from "./pages/SellProductsDashboard";
import LandLeaseDetailScreen from "./pages/LandLeaseDetailScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import Registration from "./pages/Registration";
import AdminProfile from "./pages/Admin/AdminProfile";

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<Routes>
						<Route path='/signin' element={<Signin />} />
						<Route path='/' element={<Home />} />
						<Route path='/adminprofile' element={<AdminProfile />} />
						<Route path='/register' element={<Registration />} />
						<Route path='/sellproductservice' element={<SellProductService />} />
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/productdashboard' element={<SellProductDashboard />} />
						<Route path='/workinprogress' element={<WorkInProgress />} />
						<Route path='/users' element={<Users />} />
						<Route path='/landsellingservice' element={<LandLeaseService />} />
						<Route path="/landleasedetail/:index" element={<LandLeaseDetailScreen />} />
						<Route path="/productdetail/:index" element={<ProductDetailScreen />} />
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
