export type customUser = {
	id: string;
	avatar: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: "admin" | "guide" | "accommodation" | "daypass" | "tourOperator";
	token: Function;
};

export type SignUp = {
	CodeDeliveryDetails?: {
		AttributeName?: string;
		DeliveryMedium?: string;
		Destination?: string;
	};
	UserConfirmed?: boolean;
	UserSub?: string;
	[key: string]: any; // Permite propiedades adicionales
};

export type VerificationCodeForm = {
	code: string;
};

export type SignUpForm = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	terms: boolean;
};

export type SignInForm = {
	email: string;
	password: string;
};

export type IncomingData = {
	[key: string]: any;
};

export type Data = {
	data?: any;
	error?: string;
};

export type SignIn = {
	AuthenticationResult: {
		AccessToken: string;
		ExpiresIn: number;
		IdToken: string;
		RefreshToken: string;
		TokenType: string;
	};
	ChallengeParameters?: {
		[key: string]: string;
	};
	[key: string]: any;
};
