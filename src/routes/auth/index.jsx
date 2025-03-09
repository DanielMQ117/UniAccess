import { route as cognitoRoute } from "./cognito";
import { route as customRoute } from "./custom";

export const route = {
	path: "auth",
	children: [cognitoRoute, customRoute],
};
