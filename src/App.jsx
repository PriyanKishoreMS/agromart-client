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
import SellProductService from "./pages/SellProduct";
import LandLeaseDetailScreen from "./pages/LandLeaseDetailScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import DonateScreen from "./pages/DonateScreen";
import UserEditScreen from "./pages/UserEditScreen";
import AboutUs from "./pages/AboutUsScreen";
import GalleryScreen from "./pages/GalleryScreen";
import OurServices from "./pages/OurServicesScreen";
import ContactUs from "./pages/ContactUsScreen";
import Tender from "./pages/TenderScreen";
import AdminProfile from "./pages/Admin/AdminProfile";
import BlogAddScreen from "./pages/BlogAddScreen";
import GalleryAddScreen from "./pages/GalleryAddScreen";

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<Routes>
						<Route path='/signin' element={<Signin />} />
						<Route path='/' element={<Home />} />
						<Route path='/updateUser' element={<UserEditScreen />} />
						<Route path='/donate' element={<DonateScreen />} />
						<Route
							path='/adminProfile'
							element={
								<Protected>
									<AdminProfile />
								</Protected>
							}
						/>
						<Route
							path='/addBlog'
							element={
								<Protected>
									<BlogAddScreen />
								</Protected>
							}
						/>
						<Route
							path='/addGalleryImage'
							element={
								<Protected>
									<GalleryAddScreen />
								</Protected>
							}
						/>
						{/* <Route path='/register' element={<Registration />} /> */}
						<Route
							path='/sellproductservice'
							element={
								<Protected>
									<SellProductService />
								</Protected>
							}
						/>
						<Route path='/workinprogress' element={<WorkInProgress />} />
						<Route
							path='/users'
							element={
								<Protected>
									<Users />
								</Protected>
							}
						/>
						<Route
							path='/aboutUs'
							element={
									<AboutUs />
							}
						/>
						<Route
							path='/ourServices'
							element={
									<OurServices />
							}
						/>
						<Route
							path='/tender'
							element={
								<Protected>
									<Tender />
								</Protected>
							}
						/>
						<Route
							path='/gallery'
							element={
									<GalleryScreen />
							}
						/>
						<Route
							path='/contactUs'
							element={
									<ContactUs />
							}
						/>
						<Route
							path='/landsellingservice'
							element={
								<Protected>
									<LandLeaseService />
								</Protected>
							}
						/>
						<Route
							path="/landleasedetail/:index"
							element={
								<Protected>
									<LandLeaseDetailScreen />
								</Protected>
							}
						/>
						<Route
							path="/productdetail/:index"
							element={
								<Protected>
									<ProductDetailScreen />
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
