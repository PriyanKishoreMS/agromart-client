import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
	const { user } = useAuth();
	if (!user) return <Navigate to='/' />;
	return children;
};

export default Protected;
