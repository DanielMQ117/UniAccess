"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useColorScheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { paths } from "@/paths";
import { RouterLink } from "@/components/core/link";

export function Hero() {
	const { colorScheme } = useColorScheme();

	const [img, setImg] = React.useState("/assets/home-hero-light.png");

	React.useEffect(() => {
		setImg(colorScheme === "dark" ? "/assets/home-hero-dark.png" : "/assets/home-hero-light.png");
	}, [colorScheme]);

	return (
		<Box
			sx={{
				bgcolor: "var(--mui-palette-neutral-950)",
				color: "var(--mui-palette-common-white)",
				overflow: "hidden",
				position: "relative",
				height: "100dvh",
			}}
		>
			<Box
				sx={{
					alignItems: "center",
					bottom: 0,
					display: "flex",
					justifyContent: "center",
					left: 0,
					position: "absolute",
					right: 0,
					top: 0,
					zIndex: 0,
				}}
			>
				<Box component="img" src="/assets/home-cosmic.svg" sx={{ height: "auto", width: "1600px" }} />
			</Box>
			<Box
				sx={{
					alignItems: "center",
					bottom: 0,
					display: "flex",
					justifyContent: "center",
					left: 0,
					position: "absolute",
					right: 0,
					top: 0,
					zIndex: 1,
				}}
			>
				<Box component="img" src="/assets/home-rectangles.svg" sx={{ height: "auto", width: "1900px" }} />
			</Box>
			<Container
				maxWidth="md"
				sx={{
					height: "100%",
					position: "relative",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					zIndex: 3,
				}}
			>
				<Stack spacing={4}>
					<Stack spacing={2}>
						<Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
							<img
								src="/assets/uniaccess/escudo_unan.png"
								alt="Escudo de UNAN-Leon"
								style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }}
							/>
						</Stack>
						<Typography color="neutral.300" sx={{ fontWeight: 400, textAlign: "center" }} variant="h5">
							SISTEMA DE IDENTIFICACIÓN DE ESTUDIANTES INTERNOS
						</Typography>
					</Stack>
					<Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
						<Button component={RouterLink} href={paths.auth.custom.signIn} variant="contained">
							Iniciar sesión
						</Button>
						<Button
							component={RouterLink}
							href={paths.auth.custom.signUp}
							variant="outlined"
							sx={{
								color: "var(--mui-palette-common-white)",
								"&:hover": { bgcolor: "var(--mui-palette-action-hover)" },
							}}
						>
							Registrarse
						</Button>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
