import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function SplitLayout({ children }) {
	return (
		<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 800px" }, minHeight: "100%" }}>
			<Box
				sx={{
					alignItems: "center",
					justifyContent: "center",
					bgcolor: "#ffca28", //var(--mui-palette-background-level1)
					display: { xs: "none", lg: "flex" },
					flexDirection: "column",
					p: 3,
				}}
			>
				<Stack spacing={4} sx={{ maxWidth: "700px" }}>
					<Stack spacing={1}>
						<Typography variant="h4">¡Bienvenido!</Typography>
						<Typography color="text.secondary">
							Crea tu cuenta para acceder a todos los beneficios del Sistema de Gestion de Estudiantes.
						</Typography>
					</Stack>
					<Stack
						direction="row"
						spacing={3}
						sx={{ alignItems: "center", color: "var(--mui-palette-neutral-500)", flexWrap: "wrap" }}
					></Stack>
					<Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
						<img
							src="/assets/uniaccess/escudo_unan.png"
							alt="Escudo de UNAN-Leon"
							style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }}
						/>
					</Stack>
				</Stack>
			</Box>
			<Box sx={{ boxShadow: "var(--mui-shadows-8)", display: "flex", flexDirection: "column" }}>
				<Box
					sx={{
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
						flex: "1 1 auto",
						justifyContent: "center",
						p: 3,
					}}
				>
					<Box sx={{ maxWidth: "420px", width: "100%" }}>{children}</Box>
				</Box>
			</Box>
		</Box>
	);
}
