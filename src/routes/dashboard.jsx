import * as React from "react";
import { Outlet } from "react-router-dom";

import { AuthGuard } from "@/components/auth/auth-guard";
import { Layout as DashboardLayout } from "@/components/dashboard/layout/layout";
import { Layout as MailLayout } from "@/components/dashboard/mail/layout";
import { Layout as SettingsLayout } from "@/components/dashboard/settings/layout";

export const route = {
	path: "dashboard",
	element: (
		<AuthGuard>
			<DashboardLayout>
				<Outlet />
			</DashboardLayout>
		</AuthGuard>
	),
	children: [
		{
			index: true,
			lazy: async () => {
				const { Page } = await import("@/pages/dashboard/overview");
				return { Component: Page };
			},
		},
		{
			path: "analytics",
			lazy: async () => {
				const { Page } = await import("@/pages/dashboard/analytics");
				return { Component: Page };
			},
		},
		{
			path: "calendar",
			lazy: async () => {
				const { Page } = await import("@/pages/dashboard/calendar");
				return { Component: Page };
			},
		},
		{
			path: "customers",
			children: [
				{
					index: true,
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/customers/list");
						return { Component: Page };
					},
				},
				{
					path: "create",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/customers/create");
						return { Component: Page };
					},
				},
				{
					path: ":customerId",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/customers/details");
						return { Component: Page };
					},
				},
			],
		},
		{
			path: "file-storage",
			lazy: async () => {
				const { Page } = await import("@/pages/dashboard/file-storage");
				return { Component: Page };
			},
		},
		{
			path: "mail",
			element: (
				<MailLayout>
					<Outlet />
				</MailLayout>
			),
			children: [
				{
					path: ":labelId",
					children: [
						{
							index: true,
							lazy: async () => {
								const { Page } = await import("@/pages/dashboard/mail/threads");
								return { Component: Page };
							},
						},
						{
							path: ":threadId",
							lazy: async () => {
								const { Page } = await import("@/pages/dashboard/mail/thread");
								return { Component: Page };
							},
						},
					],
				},
			],
		},
		{
			path: "settings",
			element: (
				<SettingsLayout>
					<Outlet />
				</SettingsLayout>
			),
			children: [
				{
					path: "account",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/account");
						return { Component: Page };
					},
				},
				{
					path: "billing",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/billing");
						return { Component: Page };
					},
				},
				{
					path: "notifications",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/notifications");
						return { Component: Page };
					},
				},
				{
					path: "security",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/security");
						return { Component: Page };
					},
				},
				{
					path: "team",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/team");
						return { Component: Page };
					},
				},
				{
					path: "integrations",
					lazy: async () => {
						const { Page } = await import("@/pages/dashboard/settings/integrations");
						return { Component: Page };
					},
				},
			],
		},
	],
};
