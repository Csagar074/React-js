import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../page/HomePage";
import AddCarPage from "../page/AddCarPage";
import ViewCarPage from "../page/ViewCarPage";
import EditCarPage from "../page/EditCarPage";
import CarDetailPage from "../page/CarDetailPage";
import NotFoundPage from "../page/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: "add-car",
                Component: AddCarPage
            },
            {
                path: "view-car",
                Component: ViewCarPage
            },
            {
                path: "edit-car/:id",
                Component: EditCarPage
            },
            {
                path: "car-details/:productId",
                Component: CarDetailPage
            },
            {
                path: "*",
                Component: NotFoundPage
            }
        ],
    },
]);