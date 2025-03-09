import { paths } from "@/paths";

export const dashboardConfig = {
	layout: "vertical",
	navColor: "evident",
	navItems: [
		{
			key: "dashboards",
			title: "Panel de inicio",
			items: [
				{ key: "overview", title: "Perfil", href: paths.dashboard.overview, icon: "house" },
				{ key: "analytics", title: "Historial", href: paths.dashboard.analytics, icon: "chart-pie" },
			],
		},
		{
			key: "general",
			title: "General",
			items: [
				{ key: "calendar", title: "Calendario", href: paths.dashboard.calendar, icon: "calendar-check" },
				{
					key: "customers",
					title: "Estudiantes",
					icon: "users",
					items: [
						{ key: "customers", title: "Lista de estudiantes", href: paths.dashboard.customers.list },
						{ key: "customers:create", title: "Crear perfil", href: paths.dashboard.customers.create },
						{ key: "customers:details", title: "Detalles del perfil", href: paths.dashboard.customers.details("1") },
					],
				},
				{ key: "file-storage", title: "Almacenamiento de archivos", href: paths.dashboard.fileStorage, icon: "upload" },
				{
					key: "mail",
					title: "Correo",
					href: paths.dashboard.mail.list("inbox"),
					icon: "envelope-simple",
					matcher: { type: "startsWith", href: "/dashboard/mail" },
				},
				{
					key: "settings",
					title: "Configuración",
					href: paths.dashboard.settings.account,
					icon: "gear",
					matcher: { type: "startsWith", href: "/dashboard/settings" },
				},
			],
		},
	],
};
