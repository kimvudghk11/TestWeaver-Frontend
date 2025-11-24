import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Page
import HomePage from "../pages/Home/HomePage";
import DocsPage from "../pages/Home/DocsPage";
import AboutPage from "../pages/Home/AboutPage";
import HelpPage from "../pages/Home/HelpPage";

// Auth Pages
import LoginPage from "../pages/Auth/LoginPage";
//import RegisterPage from "../pages/Auth/RegisterPage";
//import FindIdPage from "../pages/Auth/FindIdPage";
//import ResetPwPage from "../pages/Auth/ResetPwPage";

// Projects pages (로그인 이후)
//import ProjectListPage from "../pages/Project/ProjectListPage";
//import ProjectCreatePage from "../pages/Project/ProjectCreatePage";
//import ProjectDetailPage from "../pages/Project/ProjectDetailPage";

// Not Found
//import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/" element={<HomePage />} />
                <Route path="/docs" element={<DocsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/help" element={<HelpPage />} />

                {/* Auth */}
                <Route path="/auth/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}
