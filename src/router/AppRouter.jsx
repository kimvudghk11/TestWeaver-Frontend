import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import FindIdPage from "../pages/Auth/FindIdPage";
import ResetPwPage from "../pages/Auth/ResetPwPage";

import ProjectListPage from "../pages/Project/ProjectListPage";
import ProjectCreatePage from "../pages/Project/ProjectCreatePage";
import ProjectDetailPage from "../pages/Project/ProjectDetailPage";

import GeneratePage from "../pages/TestCase/GeneratePage";
import ResultPage from "../pages/TestCase/ResultPage";

import HomePage from "../pages/Home/HomePage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth */}
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/find-id" element={<FindIdPage />} />
                <Route path="/auth/reset-pw" element={<ResetPwPage />} />

                {/* Main */}
                <Route path="/" element={<HomePage />} />

                <Route path="/projects" element={<ProjectListPage />} />
                <Route path="/projects/create" element={<ProjectCreatePage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />

                <Route path="/testcases/generate" element={<GeneratePage />} />
                <Route path="/testcases/:id" element={<ResultPage />} />
            </Routes>
        </BrowserRouter>
    );
}
