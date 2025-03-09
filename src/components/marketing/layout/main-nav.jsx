"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";

import { isNavItemActive } from "@/lib/is-nav-item-active";
import { usePathname } from "@/hooks/use-pathname";
import { Dropdown } from "@/components/core/dropdown/dropdown";
import { DropdownPopover } from "@/components/core/dropdown/dropdown-popover";
import { DropdownTrigger } from "@/components/core/dropdown/dropdown-trigger";
import { RouterLink } from "@/components/core/link";

import { MobileNav } from "./mobile-nav";

export function MainNav() {
	const [openNav, setOpenNav] = React.useState(false);

	return (
		<React.Fragment>
			<Stack
				direction="row"
				spacing={2}
				alignItems="center"
				justifyContent="left"
				position="absolute"
				padding="6px"
				zIndex="var(--MainNav-zIndex)"
			>
				<img
					src="/assets/uniaccess/logo-UA.webp"
					alt="Logotipo de UniAccess"
					style={{ width: "40px", height: "40px", borderRadius: "8px" }}
				/>
			</Stack>
			<MobileNav
				onClose={() => {
					setOpenNav(false);
				}}
				open={openNav}
			/>
		</React.Fragment>
	);
}

export function NavItem({ children, disabled, external, href, matcher, pathname, title }) {
	const active = isNavItemActive({ disabled, external, href, matcher, pathname });
	const hasPopover = Boolean(children);

	const element = (
		<Box component="li" sx={{ userSelect: "none" }}>
			<Box
				{...(hasPopover
					? {
							onClick: (event) => {
								event.preventDefault();
							},
							role: "button",
						}
					: {
							...(href
								? {
										component: external ? "a" : RouterLink,
										href,
										target: external ? "_blank" : undefined,
										rel: external ? "noreferrer" : undefined,
									}
								: { role: "button" }),
						})}
				sx={{
					alignItems: "center",
					borderRadius: 1,
					color: "var(--mui-palette-neutral-300)",
					cursor: "pointer",
					display: "flex",
					flex: "0 0 auto",
					gap: 1,
					p: "6px 16px",
					textAlign: "left",
					textDecoration: "none",
					whiteSpace: "nowrap",
					...(disabled && {
						bgcolor: "var(--mui-palette-action-disabledBackground)",
						color: "var(--mui-action-disabled)",
						cursor: "not-allowed",
					}),
					...(active && { color: "var(--mui-palette-common-white)" }),
					"&:hover": {
						...(!disabled &&
							!active && { bgcolor: "rgba(255, 255, 255, 0.04)", color: "var(--mui-palette-common-white)" }),
					},
				}}
				tabIndex={0}
			>
				<Box component="span" sx={{ flex: "1 1 auto" }}>
					<Typography
						component="span"
						sx={{ color: "inherit", fontSize: "0.875rem", fontWeight: 500, lineHeight: "28px" }}
					>
						{title}
					</Typography>
				</Box>
				{hasPopover ? (
					<Box sx={{ alignItems: "center", color: "inherit", display: "flex", flex: "0 0 auto" }}>
						<CaretDownIcon fontSize="var(--icon-fontSize-sm)" />
					</Box>
				) : null}
			</Box>
		</Box>
	);

	if (hasPopover) {
		return (
			<Dropdown>
				<DropdownTrigger>{element}</DropdownTrigger>
				<DropdownPopover
					PaperProps={{ sx: { width: "800px", maxWidth: "100%" } }}
					anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
					transformOrigin={{ horizontal: "center", vertical: "top" }}
				>
					{children}
				</DropdownPopover>
			</Dropdown>
		);
	}

	return element;
}
