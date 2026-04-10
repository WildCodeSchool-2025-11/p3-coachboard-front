import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import {
	Box,
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

type TypeExercice = "Cardio" | "Muscu" | "Mobilité" | "HIIT" | "Stretching";
const TYPES: TypeExercice[] = ["Cardio", "Muscu", "Mobilité", "HIIT", "Stretching"];
const MUSCLES = ["Épaule", "Dos", "Pectoraux", "Triceps", "Biceps", "Abdos", "Lombaires", "Fessiers"] as const;
type Muscle = (typeof MUSCLES)[number];

interface GifData { id: number; nom: string; categorie: string; muscles: Muscle[]; gif_url: string; }
interface FormData { nom: string; description: string; muscles: Muscle[]; type: TypeExercice | ""; gif_url: string; }
interface Props { onSuccess: () => void; }

const CATEGORIE_TO_TYPE: Record<string, TypeExercice> = { abdominaux: "Muscu", cardio: "Cardio", jambes: "Muscu", core: "Muscu", épaules: "Muscu", bras: "Muscu", dos: "Muscu", poitrine: "Muscu" };
const CATEGORIES = ["Tous", "abdominaux", "cardio", "jambes", "core", "épaules", "bras", "dos", "poitrine"];
const SX_IN = { "& .MuiOutlinedInput-root": { background: "#111e2c", borderRadius: "6px", fontFamily: "'Barlow',sans-serif", fontSize: "0.88rem", color: "#e2e8f0", "& fieldset": { borderColor: "rgba(34,197,94,0.18)" }, "&:hover fieldset": { borderColor: "rgba(34,197,94,0.4)" }, "&.Mui-focused fieldset": { borderColor: "#22c55e" } }, "& .MuiInputLabel-root": { color: "#7a8fa6", fontSize: "0.82rem" }, "& .MuiInputLabel-root.Mui-focused": { color: "#22c55e" } };
const SX_LB = { fontFamily: "'Barlow',sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#7a8fa6", textTransform: "uppercase" as const, letterSpacing: "0.08em", mb: "10px" };
const SX_SEL = { background: "#111e2c", color: "#e2e8f0", fontFamily: "'Barlow',sans-serif", fontSize: "0.88rem", borderRadius: "6px", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(34,197,94,0.18)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(34,197,94,0.4)" }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#22c55e" }, "& .MuiSvgIcon-root": { color: "#7a8fa6" } };
const MENU = { PaperProps: { sx: { background: "#0f1b27", border: "1px solid rgba(34,197,94,0.18)", "& .MuiMenuItem-root": { fontFamily: "'Barlow',sans-serif", fontSize: "0.88rem", color: "#e2e8f0", "&:hover": { background: "rgba(34,197,94,0.08)" }, "&.Mui-selected": { background: "rgba(34,197,94,0.12)", color: "#22c55e" } } } } };
const SX_BTN = { background: "#22c55e", color: "#0b1520", fontFamily: "'Barlow Condensed',sans-serif", fontStyle: "italic", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" as const, px: "16px", py: "7px", borderRadius: "4px", transition: "all 0.2s", "&:hover": { background: "#16a34a", transform: "translateY(-1px)", boxShadow: "0 4px 16px rgba(34,197,94,0.3)" } };

export default function FormExercice({ onSuccess }: Props) {
	const { token, user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [gifs, setGifs] = useState<GifData[]>([]);
	const [search, setSearch] = useState("");
	const [catFilter, setCatFilter] = useState("Tous");
	const [form, setForm] = useState<FormData>({ nom: "", description: "", muscles: [], type: "", gif_url: "" });

	useEffect(() => { fetch("http://localhost:3310/api/gifs").then((r) => r.json()).then(setGifs).catch(console.error); }, []);

	const toggle = (m: Muscle) => setForm((f) => ({ ...f, muscles: f.muscles.includes(m) ? f.muscles.filter((x) => x !== m) : [...f.muscles, m] }));
	const selectGif = (gif: GifData) => setForm((f) => ({ ...f, gif_url: gif.gif_url, nom: gif.nom, muscles: gif.muscles ?? [], type: CATEGORIE_TO_TYPE[gif.categorie] ?? f.type }));
	const filteredGifs = gifs.filter((g) => g.nom.toLowerCase().includes(search.toLowerCase()) && (catFilter === "Tous" || g.categorie === catFilter));

	const handleSave = async () => {
		if (!form.nom || !form.type) { alert("Veuillez remplir le nom et le type."); return; }
		setLoading(true);
		try {
			const idCoach = (user as { ID_COACH?: number; id?: number })?.ID_COACH || (user as { ID_COACH?: number; id?: number })?.id || 1;
			const response = await fetch("http://localhost:3310/api/exercices", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ nom: form.nom, description: form.description, groupe_musculaire: form.muscles.join(", "), type: form.type, id_coach: idCoach, image_url: form.gif_url }) });
			if (!response.ok) throw new Error("Erreur création exercice");
			onSuccess();
		} catch (err) { console.error("Erreur FormExercice :", err); alert("Impossible de créer l'exercice."); }
		finally { setLoading(false); }
	};

	return (
		<Box sx={{ background: "rgba(15,27,39,0.95)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "12px", p: "24px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start", overflow: "hidden", maxHeight: "calc(100vh - 180px)" }}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: "16px", overflowY: "auto", maxHeight: "calc(100vh - 220px)", pr: "4px", "&::-webkit-scrollbar": { width: "4px" }, "&::-webkit-scrollbar-track": { background: "transparent" }, "&::-webkit-scrollbar-thumb": { background: "rgba(34,197,94,0.3)", borderRadius: "2px" } }}>
				<Typography sx={{ fontFamily: "'Barlow Condensed',sans-serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.1rem", color: "#7a8fa6", textTransform: "uppercase" }}>Informations de l'exercice</Typography>
				<TextField label="Nom de l'exercice" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} fullWidth sx={SX_IN} />
				<TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} multiline rows={2} fullWidth sx={SX_IN} />
				<Box>
					<Typography sx={SX_LB}>Muscles ciblés</Typography>
					<Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
						{MUSCLES.map((m) => (<Box key={m} onClick={() => toggle(m)} sx={{ px: "10px", py: "4px", borderRadius: "6px", cursor: "pointer", border: form.muscles.includes(m) ? "1px solid #22c55e" : "1px solid rgba(34,197,94,0.2)", background: form.muscles.includes(m) ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.03)", transition: "all 0.18s", "&:hover": { borderColor: "#22c55e", background: "rgba(34,197,94,0.08)" } }}><Typography sx={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.75rem", fontWeight: 500, color: form.muscles.includes(m) ? "#22c55e" : "#7a8fa6", userSelect: "none" }}>{m}</Typography></Box>))}
					</Box>
				</Box>
				<Box>
					<Typography sx={SX_LB}>Type d'exercice</Typography>
					<FormControl sx={{ minWidth: 160 }}>
						<InputLabel sx={{ color: "#7a8fa6", fontSize: "0.82rem", "&.Mui-focused": { color: "#22c55e" } }}>Type</InputLabel>
						<Select value={form.type} label="Type" onChange={(e) => setForm({ ...form, type: e.target.value as TypeExercice })} sx={SX_SEL} MenuProps={MENU}>
							{TYPES.map((t) => (<MenuItem key={t} value={t}>{t}</MenuItem>))}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button onClick={handleSave} disabled={loading} startIcon={<SaveIcon sx={{ fontSize: 15 }} />} sx={SX_BTN}>{loading ? "Création..." : "Créer l'exercice"}</Button>
				</Box>
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "calc(100vh - 220px)", overflow: "hidden" }}>
				<Typography sx={{ fontFamily: "'Barlow Condensed',sans-serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.1rem", color: "#7a8fa6", textTransform: "uppercase" }}>Sélectionner un GIF</Typography>
				<Box sx={{ width: "100%", height: "200px", borderRadius: "8px", overflow: "hidden", border: form.gif_url ? "2px solid #22c55e" : "1px solid rgba(34,197,94,0.18)", background: "#0b1520", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
					{form.gif_url ? (<img src={`http://localhost:3310${form.gif_url}`} alt="GIF sélectionné" style={{ width: "100%", height: "100%", objectFit: "contain" }} />) : (<Typography sx={{ color: "#3a5060", fontSize: "0.75rem", fontFamily: "'Barlow',sans-serif" }}>Aucun GIF sélectionné</Typography>)}
				</Box>
				<TextField placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} size="small" InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: "#7a8fa6", fontSize: 16 }} /></InputAdornment>) }} sx={{ flexShrink: 0, "& .MuiOutlinedInput-root": { background: "#111e2c", borderRadius: "6px", fontFamily: "'Barlow',sans-serif", fontSize: "0.82rem", color: "#e2e8f0", height: "34px", "& fieldset": { borderColor: "rgba(34,197,94,0.18)" }, "&:hover fieldset": { borderColor: "rgba(34,197,94,0.4)" }, "&.Mui-focused fieldset": { borderColor: "#22c55e" } }, "& input::placeholder": { color: "#7a8fa6" } }} />
				<Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px", flexShrink: 0 }}>
					{CATEGORIES.map((cat) => (<Box key={cat} onClick={() => setCatFilter(cat)} sx={{ px: "9px", py: "2px", borderRadius: "20px", cursor: "pointer", border: catFilter === cat ? "1px solid #22c55e" : "1px solid rgba(34,197,94,0.2)", background: catFilter === cat ? "rgba(34,197,94,0.15)" : "transparent", transition: "all 0.15s", "&:hover": { borderColor: "#22c55e" } }}><Typography sx={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.68rem", color: catFilter === cat ? "#22c55e" : "#7a8fa6", userSelect: "none", textTransform: "capitalize" }}>{cat}</Typography></Box>))}
				</Box>
				<Box sx={{ overflowY: "auto", flex: 1, pr: "4px", "&::-webkit-scrollbar": { width: "4px" }, "&::-webkit-scrollbar-track": { background: "transparent" }, "&::-webkit-scrollbar-thumb": { background: "rgba(34,197,94,0.3)", borderRadius: "2px" } }}>
					<Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
						{filteredGifs.map((gif) => (<Box key={gif.id} onClick={() => selectGif(gif)} sx={{ borderRadius: "6px", overflow: "hidden", border: form.gif_url === gif.gif_url ? "2px solid #22c55e" : "1px solid rgba(34,197,94,0.13)", cursor: "pointer", background: "#0f1b27", transition: "all 0.18s", "&:hover": { borderColor: "#22c55e", transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(34,197,94,0.15)" } }}><img src={`http://localhost:3310${gif.gif_url}`} alt={gif.nom} style={{ width: "100%", aspectRatio: "4/3", objectFit: "contain", display: "block", background: "#0f1b27" }} /><Typography sx={{ fontSize: "0.62rem", fontWeight: 500, color: form.gif_url === gif.gif_url ? "#22c55e" : "#a0b0c0", textAlign: "center", p: "3px 4px", background: "#0b1520", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "'Barlow',sans-serif" }}>{gif.nom}</Typography></Box>))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}