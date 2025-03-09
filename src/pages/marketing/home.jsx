import * as React from "react";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { Hero } from "@/components/marketing/home/hero";
import { Identification } from "@/components/marketing/home/identification";

const metadata = { title: appConfig.name, description: appConfig.description };

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<div>
				<Hero />
				<Identification />
			</div>
		</React.Fragment>
	);
}
