import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
    ROLES,
    userListItems,
} from "./common";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    setActivePage,
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
import CreateAccountPage from "./pages/CreateAccount";
import DirectDepositPage from "./pages/DirectDeposit";
import TransactionHistoryPage from "./pages/TransactionHistory";
import EmployeeManagementPage from "./pages/EmployeeManagment";
import PartnerTransactionHistoryPage from "./pages/PartnerTransactionHistory";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import { selectCustomerId } from "./features/Auth/authSlice";
import { useGetAccountsByCustomerIdQuery } from "./features/Account/accountApiSlice";
import { useGetRecipientsByCustomerIdQuery } from "./features/Recipient/recipientApiSlice";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function App() {
    const dispatch = useDispatch();
    const customerId = useSelector(selectCustomerId);
    const location = useLocation();
    const pageListItems = useSelector(state => state.pageList.items);
    
    useGetAccountsByCustomerIdQuery(customerId, {
        skip: customerId ? false : true
    });
    
    useGetRecipientsByCustomerIdQuery(customerId, {
        skip: customerId ? false : true
    });

    useEffect(() => {
        dispatch(setUserPageList(userListItems));
    }, [dispatch]);

    useEffect(() => {
        const activePageIndex = pageListItems.findIndex((item) => {
            return location.pathname === item.link;
        });
        dispatch(setActivePage(activePageIndex));
    }, [dispatch, location, pageListItems]);
    return (
        <div className="App">
            <Routes>
                {/* public routes */}
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/logout" element={<LogoutPage />} />
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
                <Route exact path="/unauthorized" element={<Unauthorized />} />
                
                {/* private routes */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route
                            exact
                            path="/change-password"
                            element={<ChangePasswordPage />}
                        />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={ROLES.customer}/>}>
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
                    </Route>
                    
                    <Route element={<RequireAuth allowedRoles={ROLES.employee}/>}>
                        <Route
                            exact
                            path="/create-account"
                            element={
                                <DefaultLayout>
                                    <CreateAccountPage />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            exact
                            path="/direct-deposit"
                            element={
                                <DefaultLayout>
                                    <DirectDepositPage />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            exact
                            path="/transaction-history"
                            element={
                                <DefaultLayout>
                                    <TransactionHistoryPage />
                                </DefaultLayout>
                            }
                        />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
                        <Route
                            exact
                            path="/employee-management"
                            element={
                                <DefaultLayout>
                                    <EmployeeManagementPage />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            exact
                            path="/partner-transaction-history"
                            element={
                                <DefaultLayout>
                                    <PartnerTransactionHistoryPage />
                                </DefaultLayout>
                            }
                        />
                    </Route>
                </Route>
                
            </Routes>
        </div>
    );
}

export default App;
