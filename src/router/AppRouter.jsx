import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BusArrivalPage from "../pages/BusArrivalPage.jsx";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <BusArrivalPage /> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
