import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={<PublicRouter />} />
                <Route path="/*" element={<PrivateRouter />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
