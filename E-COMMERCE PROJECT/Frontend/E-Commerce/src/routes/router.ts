import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "../Pages/Auth/LoginPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ForgotPasswordPage from "../Pages/Auth/ForgotPasswordPage";
import OTPVerifyPage from "../Pages/Auth/OTPVerifyPage";
import NewPasswordPage from "../Pages/Auth/NewPasswordPage";
import { DashboardContent } from "../Pages/Dashboard/DashboardContent";
import AddAdminPage from "../Pages/Admin/AddAdminPage";
import ViewAdminPage from "../Pages/Admin/ViewAdminPage";
import EditAdminPage from "../Pages/Admin/EditAdminPage";
import ViewUserPage from "../Pages/Users/ViewUsersPage";
import AddUserPage from "../Pages/Users/AddUserPage";
import EditUserPage from "../Pages/Users/EditUserPage";

export const allRoutes = {
    login: '/login',
    forgotPassword: '/forgot-password',
    OTPVeify: '/otp-verify',
    newPassword: '/new-password',
    dashboard: '/dashboard',
    addAdmin: 'add-admin',
    viewAdmin: 'view-admin',
    editAdmin: 'edit-admin',
    addUser: 'add-user',
    viewUsers: 'view-users',
    editUser: 'edit-user'
};

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: allRoutes.login,
                Component: LoginPage
            },
            {
                path: allRoutes.forgotPassword,
                Component: ForgotPasswordPage
            },
            {
                path: allRoutes.OTPVeify,
                Component: OTPVerifyPage
            },
            {
                path: allRoutes.newPassword,
                Component: NewPasswordPage
            },
            {
                path: allRoutes.dashboard,
                Component: Dashboard,
                children: [
                    {
                        index: true,
                        Component: DashboardContent
                    },
                    {
                        path: allRoutes.addAdmin,
                        Component: AddAdminPage
                    },
                    {
                        path: allRoutes.viewAdmin,
                        Component: ViewAdminPage
                    },
                    {
                        path: allRoutes.editAdmin,
                        Component: EditAdminPage,
                        children: [
                            {
                                path: ":adminId",
                                Component: EditAdminPage
                            }
                        ]
                    },
                    {
                        path: allRoutes.addUser,
                        Component: AddUserPage
                    },
                    {
                        path: allRoutes.viewUsers,
                        Component: ViewUserPage
                    },
                    {
                        path: allRoutes.editUser,
                        Component: EditUserPage,
                        children: [
                            {
                                path: ":userId",
                                Component: EditUserPage
                            }
                        ]
                    },
                ]
            },
        ]
    },
]);