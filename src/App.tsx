import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Route, Link as RouterLink, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

function Copyright() {
	return (
		<Typography
			variant="body2"
			align="center"
			sx={{
				color: "text.secondary",
			}}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}.
		</Typography>
	);
}

export default function App() {
	return (
		<Container maxWidth="sm">
			{/* Barre de navigation simple */}
			<Box component="nav" sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
				<Stack direction="row" spacing={4} justifyContent="center">
					<Link component={RouterLink} to="/" variant="h6" underline="hover">
						Accueil
					</Link>
					<Link
						component={RouterLink}
						to="/about"
						variant="h6"
						underline="hover"
					>
						À propos
					</Link>
				</Stack>
			</Box>

			{/* Configuration des Routes */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>

			<Box sx={{ my: 4 }}>
				<Copyright />
			</Box>
		</Container>
	);
}
