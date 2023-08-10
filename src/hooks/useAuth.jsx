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
	const [userDataContent, setUserDataContent] = useState(null);

	// const updateUserData = (newUserData) => {
	// 	console.log(newUserData, "newUserData");
	// 	setUserData(newUserData);
	// };

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};

	const logOut = async () => {
		try {
			await signOut(auth);
			localStorage.removeItem("token");
			setUserDataContent(null);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
			setUser(currentUser);
			if (currentUser) {
				const userData = {
					uid: currentUser.uid,
					email: currentUser.email,
					name: currentUser.displayName,
					photoURL: currentUser.photoURL,
				};
				const userContent = await createUser(userData);
				console.log(userContent.user, "userContent");
				setUserDataContent(userContent.user);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user, userDataContent }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
