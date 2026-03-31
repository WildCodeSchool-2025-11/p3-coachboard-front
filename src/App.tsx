import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import DashboardCoach from "./pages/DashboardCoach";
import DashboardEleves from "./pages/DashboardEleves";
import ExercicesPage from "./pages/ExercicesPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import MonSuivi from "./pages/MonSuivi";
import NouvelExercicePage from "./pages/NouvelExercicePage";

function ProtectedRoute() {
	const { token } = useAuth();
	return token ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<Login />} />
			<Route element={<ProtectedRoute />}>
				<Route path="/dashboard-coach" element={<DashboardCoach />} />
				<Route path="/dashboard-eleves" element={<DashboardEleves />} />
				<Route path="/exercices" element={<ExercicesPage />} />
				<Route path="/exercices/nouveau" element={<NouvelExercicePage />} />
				<Route path="/mon-suivi" element={<MonSuivi />} />
			</Route>
		</Routes>
	);
}

export default App;
