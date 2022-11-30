import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { customerListItems, userListItems } from "./common";
import { useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import {
    setActivePage,
    setPageList,
    setUserPageList,
} from "./features/Page/pageSlice";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import PaymentRequestPage from "./pages/PaymentRequest";
import DefaultLayout from "./layouts/DefaultLayout";
import TransferPage from "./pages/Transfer";
import RecipientPage from "./pages/RecipientPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import VerificationCodePage from "./pages/VerificationCode";
import ResetPasswordPage from "./pages/ResetPassword";
import ChangePasswordPage from "./pages/ChangePassword";
import LogoutPage from "./pages/Logout";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    useLayoutEffect(() => {
        dispatch(setPageList(customerListItems));
        dispatch(setUserPageList(userListItems));
    }, [dispatch]);

    useLayoutEffect(() => {
        const activePageIndex = customerListItems.findIndex((item) => {
            return location.pathname === item.link;
        });
        dispatch(setActivePage(activePageIndex));
    }, [dispatch, location]);
    return (
        <div className="App">
            <Routes>
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/logout" element={<LogoutPage />} />
                <Route
                    exact
                    path="/"
                    element={
                        <DefaultLayout>
                            <HomePage />
                        </DefaultLayout>
                    }
                />
                <Route
                    exact
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />
                <Route
                    exact
                    path="/verification-code"
                    element={<VerificationCodePage />}
                />
                <Route
                    exact
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                />
                <Route
                    exact
                    path="/recipients"
                    element={
                        <DefaultLayout>
                            <RecipientPage />
                        </DefaultLayout>
                    }
                />
                <Route
                    exact
                    path="/transfer"
                    element={
                        <DefaultLayout>
                            <TransferPage />
                        </DefaultLayout>
                    }
                />

                <Route
                    exact
                    path="/payment-requests"
                    element={
                        <DefaultLayout>
                            <PaymentRequestPage />
                        </DefaultLayout>
                    }
                />
                <Route
                    exact
                    path="/change-password"
                    element={<ChangePasswordPage />}
                />
            </Routes>
        </div>
    );
}

export default App;
