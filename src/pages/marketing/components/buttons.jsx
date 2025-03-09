import * as React from "react";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { Buttons1 } from "@/components/widgets/buttons/buttons-1";
import { Buttons2 } from "@/components/widgets/buttons/buttons-2";
import { Buttons3 } from "@/components/widgets/buttons/buttons-3";
import { Buttons4 } from "@/components/widgets/buttons/buttons-4";
import { Layout } from "@/components/widgets/layout";

const metadata = { title: `Buttons | Components | ${appConfig.name}` };

const components = [
	{ title: "Simple buttons", element: <Buttons1 /> },
	{ title: "Buttons with text and icon", element: <Buttons2 /> },
	{ title: "Button groups", element: <Buttons3 /> },
	{ title: "Icon buttons", element: <Buttons4 /> },
];

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Layout components={components} title="Buttons" />
		</React.Fragment>
	);
}
