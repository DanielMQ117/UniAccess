import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Briefcase as BriefcaseIcon } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { FileCode as FileCodeIcon } from "@phosphor-icons/react/dist/ssr/FileCode";
import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import { ListChecks as ListChecksIcon } from "@phosphor-icons/react/dist/ssr/ListChecks";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { Warning as WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { dayjs } from "@/lib/dayjs";
import { AppChat } from "@/components/dashboard/overview/app-chat";
import { AppLimits } from "@/components/dashboard/overview/app-limits";
import { AppUsage } from "@/components/dashboard/overview/app-usage";
import { Events } from "@/components/dashboard/overview/events";
import { HelperWidget } from "@/components/dashboard/overview/helper-widget";
import { Subscriptions } from "@/components/dashboard/overview/subscriptions";
import { Summary } from "@/components/dashboard/overview/summary";

const metadata = { title: `Overview | Dashboard | ${appConfig.name}` };

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Box
				sx={{
					maxWidth: "var(--Content-maxWidth)",
					m: "var(--Content-margin)",
					p: "var(--Content-padding)",
					width: "var(--Content-width)",
				}}
			>
				<Stack spacing={4}>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
						<Box sx={{ flex: "1 1 auto" }}>
							<Typography variant="h4">Detalles</Typography>
						</Box>
						<div>
							<Button startIcon={<PlusIcon />} variant="contained">
								Dashboard
							</Button>
						</div>
					</Stack>
					<Grid container spacing={4}>
						<Grid
							size={{
								md: 4,
								xs: 12,
							}}
						>
							<Summary amount={31} diff={15} icon={ListChecksIcon} title="Retiro de comidas" trend="up" />
						</Grid>
						<Grid
							size={{
								md: 4,
								xs: 12,
							}}
						>
							<Summary amount={240} diff={5} icon={UsersIcon} title="Asistencias" trend="down" />
						</Grid>
						<Grid
							size={{
								md: 4,
								xs: 12,
							}}
						>
							<Summary amount={21} diff={12} icon={WarningIcon} title="Faltas" trend="up" />
						</Grid>
						<Grid
							size={{
								md: 8,
								xs: 12,
							}}
						>
							<AppUsage
								data={[
									{ name: "Jan", v1: 36, v2: 19 },
									{ name: "Feb", v1: 45, v2: 23 },
									{ name: "Mar", v1: 26, v2: 12 },
									{ name: "Apr", v1: 39, v2: 20 },
									{ name: "May", v1: 26, v2: 12 },
									{ name: "Jun", v1: 42, v2: 31 },
									{ name: "Jul", v1: 38, v2: 19 },
									{ name: "Aug", v1: 39, v2: 20 },
									{ name: "Sep", v1: 37, v2: 18 },
									{ name: "Oct", v1: 41, v2: 22 },
									{ name: "Nov", v1: 45, v2: 24 },
									{ name: "Dec", v1: 23, v2: 17 },
								]}
							/>
						</Grid>
						<Grid
							size={{
								md: 4,
								xs: 12,
							}}
						>
							<Events
								events={[
									{
										id: "EV-004",
										title: "Meeting with partners",
										description: "17:00 to 18:00",
										createdAt: dayjs().add(1, "day").toDate(),
									},
									{
										id: "EV-003",
										title: "Interview with Jonas",
										description: "15:30 to 16:45",
										createdAt: dayjs().add(4, "day").toDate(),
									},
									{
										id: "EV-002",
										title: "Doctor's appointment",
										description: "12:30 to 15:30",
										createdAt: dayjs().add(4, "day").toDate(),
									},
									{
										id: "EV-001",
										title: "Weekly meeting",
										description: "09:00 to 09:30",
										createdAt: dayjs().add(7, "day").toDate(),
									},
								]}
							/>
						</Grid>
						<Grid
							size={{
								md: 4,
								xs: 12,
							}}
						>
							<HelperWidget
								action={
									<Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
										Documentation
									</Button>
								}
								description="Aprenda a usar la App con la guía de inicio rápido."
								icon={FileCodeIcon}
								label="Documentación"
								title="Explorar documentación"
							/>
						</Grid>
					</Grid>
				</Stack>
			</Box>
		</React.Fragment>
	);
}
