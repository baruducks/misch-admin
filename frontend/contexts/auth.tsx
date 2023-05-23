import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingComponent from "../component/Loading/LoadingComponent";
import axios from "axios";
import BerhasilPop from "../component/Popup/BerhasilPop";
import GagalPop from "../component/Popup/GagalPop";
import Cookies from "universal-cookie";

const AuthContext = createContext({});

function check() {
	const data = JSON.parse(localStorage.getItem("data") as string);
	if (data) {
		return data;
	} else {
		return undefined;
	}
}

export const AuthProvider = ({ children }: any) => {
	const router = useRouter();
	const cookies = new Cookies();
	const error = "Username atau Password salah!";
	const berhasil = "Berhasil Login!";
	//   console.log(akun.accessToken);
	const [akun, setAkun] = useState({
		accessToken: "",
		name: "",
		role: "",
		username: "",
		tenantId: "",
		id: "",
		email: "",
	});

	const [isAuthenticated, setAuthenticated] = useState(false);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const token = cookies.get("refreshToken");
		// console.log(token);
		// setLoading(false);
		const data = JSON.parse(localStorage.getItem("data") as string);
		if (!token) {
			if (data) {
				var msg = "Silahkan Login kembali!";
				GagalPop(msg);
				localStorage.removeItem("data");
				cookies.remove("refreshToken");
				cookies.remove("x-access-token");
				router.push("/login");
				setAuthenticated(false);
				return;
			}
			setLoading(false);
		}
		// console.log(data);
		if (data) {
			axios
				.post("http://localhost:5000/profile", {
					username: data.username,
				})
				.then((res) => {
					if (res.data) {
						localStorage.setItem("data", JSON.stringify(res.data));
						setAuthenticated(true);
					}
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
		verifyToken();
		setLoading(false);
		// console.log(isAuthenticated + " " + isLoading);
	}, []);

	const verifyToken = async () => {
		axios
			.get("http://localhost:5000/users", {
				withCredentials: true,
			})
			.then((res) => {
				setAuthenticated(true);
				// console.log(res);
				// console.log(isAuthenticated);
			})
			.catch((err) => {
				if (err) {
					axios
						.get("http://localhost:5000/token", { withCredentials: true })
						.then((res) => {
							setAuthenticated(true);
							// console.log(res);
						})
						.catch((err) => {
							setAuthenticated(false);
							if (!isAuthenticated && router.asPath !== "/login") {
								var msg = "Anda belum login!";
								GagalPop(msg);
								localStorage.removeItem("data");
								cookies.remove("refreshToken");
								cookies.remove("x-access-token");
								router.push("/login");
							}
						});
				}
			});
		setLoading(false);
	};

	const logout = ({ redirectLocation }: any) => {
		const msg = "Logout Berhasil!";
		axios
			.delete("http://localhost:5000/logout", { withCredentials: true })
			.then((res) => {
				localStorage.removeItem("data");
				router.push("/login");
				BerhasilPop(msg);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const login = async (username: any, password: any) => {
		await axios
			.post(
				"http://localhost:5000/login",
				{
					username: username,
					password: password,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				// console.log(res.data);
				localStorage.setItem("data", JSON.stringify(res.data));
				const data = JSON.parse(localStorage.getItem("data") as string);
				BerhasilPop(berhasil);
				setAuthenticated(true);
				router.push("/");
				// router.push("localhost:3000");
			})
			.catch((err) => {
				GagalPop(error);
				// console.log(err);
			});
		setLoading(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, akun, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

function push() {
	const msg = "Silahkan Login dahulu!";
	if (typeof window !== "undefined") {
		useRouter().push("/login");
		GagalPop(msg);
	}
}
export const useAuth = () => useContext(AuthContext);
