"use client";

import * as React from "react";

import { appConfig } from "@/config/app";
import { AuthStrategy } from "@/lib/auth-strategy";

import { AuthGuard as CognitoAuthGuard } from "./cognito/auth-guard";
import { AuthGuard as CustomAuthGuard } from "./custom/auth-guard";

export function AuthGuard(props) {
	if (appConfig.authStrategy === AuthStrategy.COGNITO) {
		return <CognitoAuthGuard {...props} />;
	}

	if (appConfig.authStrategy === AuthStrategy.CUSTOM) {
		return <CustomAuthGuard {...props} />;
	}

	return <React.Fragment {...props} />;
}
