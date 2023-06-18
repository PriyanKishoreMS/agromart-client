import { useContext, createContext, useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { auth } from "../components/firebaseauthconfig";
import { createUser } from "../api/usersApi";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};

	const logOut = async () => {
		try {
			await signOut(auth);
			localStorage.removeItem("token");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);
			if (currentUser) {
				const userData = {
					uid: currentUser.uid,
					email: currentUser.email,
					name: currentUser.displayName,
					photoURL: currentUser.photoURL,
				};
				createUser(userData);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
