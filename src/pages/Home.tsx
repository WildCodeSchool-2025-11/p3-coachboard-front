import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProTip from "../ProTip";

export default function Home() {
	return (
		<Box sx={{ my: 4 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				Page d'Accueil
			</Typography>
			<Typography variant="body1" gutterBottom>
				Bienvenue sur votre application React + Material UI !
			</Typography>
			<ProTip />
		</Box>
	);
}
