"use client";

import * as React from "react";
import { Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useColorScheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Scan as CameraIcon } from "@phosphor-icons/react/dist/ssr/Scan";
import jsQR from "jsqr";

import { extractData } from "@/lib/dataExtractor";

export function Identification() {
	const [data, setData] = React.useState<any>({});
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const [cameras, setCameras] = React.useState<MediaDeviceInfo[]>([]);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [selectedCamera, setSelectedCamera] = React.useState<string | null>(null);
	const [isStreamActive, setIsStreamActive] = React.useState(false); // Estado para controlar el stream
	const [qrCode, setQrCode] = React.useState<string | boolean>(false); // Estado para almacenar el código QR detectado

	const { colorScheme } = useColorScheme();
	const [img, setImg] = React.useState("/assets/home-hero-light.png");

	React.useEffect(() => {
		setImg(colorScheme === "dark" ? "/assets/home-hero-dark.png" : "/assets/home-hero-light.png");
	}, [colorScheme]);

	// Enumerar cámaras disponibles
	React.useEffect(() => {
		const getCameras = async () => {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const videoDevices = devices.filter((device) => device.kind === "videoinput");
			console.log(videoDevices);
			setCameras(videoDevices);
		};
		getCameras();
	}, []);

	// Iniciar la cámara
	React.useEffect(() => {
		const startCamera = async (deviceId: string): Promise<void> => {
			try {
				const camara = {
					video: { deviceId: { exact: deviceId } },
				};
				const stream = await navigator.mediaDevices.getUserMedia(camara);
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					setIsStreamActive(true); // Activar el stream
				}
				setSelectedCamera(deviceId);
			} catch (error) {
				console.error("Error al acceder a la cámara:", error);
			}
		};
		if (selectedCamera) {
			startCamera(selectedCamera);
		}
	}, [selectedCamera]); // Este efecto se ejecuta cuando selectedCamera cambia

	// Detener la cámara
	const stopCamera = () => {
		if (videoRef.current?.srcObject) {
			const stream = videoRef.current.srcObject as MediaStream;
			stream.getTracks().forEach((track) => track.stop()); // Detener todas las pistas del stream
			videoRef.current.srcObject = null;
			setIsStreamActive(false); // Desactivar el stream
			setQrCode(false); // Limpiar el código QR detectado
		}
	};

	// Escanear el código QR
	React.useEffect(() => {
		const tick = () => {
			if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
				const video = videoRef.current;
				const canvas = canvasRef.current;
				const context = canvas.getContext("2d");

				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;

				// Dibujar el frame del video en el canvas
				context?.drawImage(video, 0, 0, canvas.width, canvas.height);

				// Extraer los datos de píxeles
				const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);

				// Detectar el código QR
				if (imageData) {
					const code = jsQR(imageData.data, imageData.width, imageData.height, {
						inversionAttempts: "dontInvert",
					});

					if (code) {
						setQrCode(code.data); // Almacenar el código QR detectado
					}
				}
			}

			if (isStreamActive) {
				requestAnimationFrame(tick); // Continuar escaneando
			}
		};

		if (isStreamActive) {
			tick(); // Iniciar el escaneo cuando el stream está activo
		}
	}, [isStreamActive]); // Este efecto se ejecuta cuando isStreamActive cambia

	React.useEffect(() => {
		// Extraer los datos del código QR solo si qrCode es válido y no es false
		if (qrCode && typeof qrCode === "string") {
			const info = extractData(qrCode);
			console.log(info);
			if (info) {
				setData(info);
			} else {
				setData({}); // Asegurar que no se muestren datos inválidos
			}
		}
	}, [qrCode]);

	// Manejar el menú de selección de cámara
	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleCameraSelect = (deviceId: string) => {
		setSelectedCamera(deviceId);
		handleMenuClose();
	};

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
					<Stack spacing={2} alignItems="center">
						<Typography color="neutral.300" sx={{ fontWeight: 400, textAlign: "center" }} variant="h5">
							LECTOR QR
						</Typography>
						<Box sx={{ justifyContent: "center", alignSelf: "center", objectFit: "contain", padding: "2rem" }}>
							{!isStreamActive && (
								<CameraIcon
									style={{
										width: "auto",
										height: "6rem",
										objectFit: "inherit",
									}}
									fontSize="var(--icon-fontSize-lg)"
								/>
							)}
							<video
								ref={videoRef}
								autoPlay
								playsInline
								style={{
									width: "auto",
									height: "15rem",
									objectFit: "inherit",
									borderRadius: "8px",
									display: isStreamActive ? "block" : "none", // Ocultar si no hay stream
								}}
							>
								<track kind="captions" />
							</video>
							<canvas ref={canvasRef} style={{ display: "none" }} /> {/* Canvas oculto para el escaneo */}
						</Box>
						{qrCode && (
							<Box
								sx={{
									width: "50dvw",
									textAlign: "center",
									wordWrap: "break-word",
									overflowWrap: "break-word",
									margin: "0 auto",
								}}
							>
								<Typography variant="h6">Código QR detectado: {qrCode}</Typography>
							</Box>
						)}{" "}
						{/* Mostrar el código QR */}
					</Stack>
					<Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
						{/* Botón para seleccionar cámara */}
						<Button onClick={handleMenuOpen} variant="contained">
							Seleccionar cámara
						</Button>
						<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
							{cameras.map((camera, i) => (
								<MenuItem
									key={camera.deviceId}
									onClick={() => handleCameraSelect(camera.deviceId)}
									selected={camera.deviceId === selectedCamera}
								>
									{camera.label ? `${i + 1} - ${camera.label}` : `Cámara ${cameras.indexOf(camera) + 1}`}
								</MenuItem>
							))}
						</Menu>
						{/* Botón para detener la cámara */}
						{isStreamActive && (
							<Button
								onClick={stopCamera}
								variant="outlined"
								sx={{
									margin: "8px",
									color: "var(--mui-palette-common-white)",
									"&:hover": { bgcolor: "var(--mui-palette-action-hover)" },
								}}
							>
								Detener cámara
							</Button>
						)}
					</Stack>
					<Stack direction="column" spacing={1} sx={{ justifyContent: "start" }}>
						<Typography variant="h6">ID: {data?.first14 || ""}</Typography>
						<Typography variant="h6">
							Nombre:{" "}
							{data
								? `${data.firstName || ""} ${data.secondName || ""} ${data.lastName || ""} ${data.secondLastName || ""}`.trim()
								: ""}
						</Typography>
						<Typography variant="h6">Ciudad: {data?.city || ""}</Typography>
						<Typography variant="h6">Nacimiento: {data?.birthDate || ""}</Typography>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
