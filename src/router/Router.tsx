import {RouteObject, useNavigate, useRoutes} from "react-router-dom";
import Login from "../pages/Login";
import axios from "axios";
import Home from "../pages/Home";
import Register from "../pages/Register";
import InterfaceInfoPage from "../pages/InterfaceInfoPage";

const routes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/info",
        element: <InterfaceInfoPage />,
    },
];

const Router = () => {
    const navigate = useNavigate();

    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response && (error.response.status === 401 ||  error.response.status === 400)) {
                // 如果后端返回401，表示未授权，重定向到/login页面
                // 同样使用React Router的<Redirect>组件实现重定向
                // 或者你也可以在此处调用react-router-dom提供的history对象进行跳转
                navigate("/login");
            }
            return Promise.reject(error);
        }
    );
    return useRoutes(routes);
};

export default Router;
