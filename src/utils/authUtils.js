import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setUserInfo } from "../features/Users/usersSlice";
import store from "../app/store";
import { Navigate } from "react-router-dom";

export function initializeUserInfoFromToken() {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken || accessToken === "undefined") {
        console.log("Lỗi: Không có accessToken hoặc accessToken không hợp lệ.");
        removeTokensAndRedirect();
        return;
    }

    try {
        const decodedToken = jwtDecode(accessToken);

        store.dispatch(setUserInfo(decodedToken));
    } catch (error) {
        console.error("Error with accessToken:", error);
        removeTokensAndRedirect();
    }
}

function removeTokensAndRedirect() {
    return <Navigate to="/login" replace />;
}
