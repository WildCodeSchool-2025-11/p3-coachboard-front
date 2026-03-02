import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function About() {
	return (
		<Box sx={{ my: 4 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				À propos
			</Typography>
			<Typography variant="body1" gutterBottom>
				Cette page est un exemple de navigation avec React Router.
			</Typography>
			<Typography variant="body1" paragraph>
				React Router permet de naviguer entre différentes pages de votre
				application sans recharger la page complète.
			</Typography>

			<Button variant="contained" component={RouterLink} to="/">
				Retour à l'accueil
			</Button>
		</Box>
	);
}
