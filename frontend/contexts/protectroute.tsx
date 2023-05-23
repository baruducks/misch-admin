import { useAuth } from "./auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingComponent from "../component/Loading/LoadingComponent";

export const PrivateRoute = ({ protectedRoutes, children }: any) => {
	const router = useRouter();
	const { isAuthenticated, isLoading }: any = useAuth();
	const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

	useEffect(() => {
		console.log(isAuthenticated);
		if (!isLoading && !isAuthenticated && pathIsProtected) {
			if (router.asPath !== "/login") {
				router.push("/login");
			}
		}
	}, []);

	if ((isLoading || !isAuthenticated) && pathIsProtected) {
		return <LoadingComponent />;
	}

	return children;
};
