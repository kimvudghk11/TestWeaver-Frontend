import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Public Page
import HomePage from "../pages/Home/HomePage";
import DocsPage from "../pages/Home/DocsPage";
import AboutPage from "../pages/Home/AboutPage";
import HelpPage from "../pages/Home/HelpPage";

// Auth Pages
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import FindIdPage from "../pages/Auth/FindIdPage";
import ResetPwPage from "../pages/Auth/ResetPwPage";

// Projects pages (로그인 이후)
import ProjectListPage from "../pages/Project/ProjectListPage";
import ProjectCreatePage from "../pages/Project/ProjectCreatePage";

// Projects 내부
import TestCaseConfigPage from "../pages/TestCase/TestCaseConfigPage";
import TestCaseListPage from "../pages/TestCase/TestCaseListPage";

// Not Found
//import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />

            {/* Auth */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/find-id" element={<FindIdPage />} />
            <Route path="/auth/reset-password" element={<ResetPwPage />} />

            <Route element={<ProtectedRoute />}>
                {/* Project */}
                <Route path="/projects" element={<ProjectListPage />} />
                <Route path="/projects/create" element={<ProjectCreatePage />} />

                {/* Project 내부 페이지 (Test Case) */}
                <Route path="/projects/:id/config" element={<TestCaseConfigPage />} />
                <Route path="/projects/:id/testcases" element={<TestCaseListPage />} />
            </Route>
        </Routes>
    );
}
