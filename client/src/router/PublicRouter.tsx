import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Register from "../pages/Register";

const PublicRouter = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<LoginForm />} />
        </Routes>
    );
};

export default PublicRouter;
