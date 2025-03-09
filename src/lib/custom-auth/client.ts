import { createUserManager } from "@/lib/cognito/user-manager";
import * as Type from "@/lib/definitions";

// NOTE: This is a simple in-memory implementation of an authentication client.
//  It is used to demonstrate how to create a custom authentication client to connect to your API.

function generateToken() {
	const arr = new Uint8Array(12);
	globalThis.crypto.getRandomValues(arr);
	return Array.from(arr, (v) => v.toString(16).padStart(2, "0")).join("");
}

const user = {
	id: "USR-000",
	avatar: "/assets/avatar.png",
	firstName: "Sofia",
	lastName: "Rivers",
	email: "sofia@devias.io",
};

class AuthClient {
	cognitoConfig: any;
	url: string;

	constructor(cognitoAuthConfig: any) {
		this.cognitoConfig = cognitoAuthConfig;
		this.url = "https://cognito-idp.us-east-1.amazonaws.com/";
	}

	async signUp(params: Type.SignUpForm | any): Promise<Type.Data> {
		const { email, password, firstName, lastName } = params;

		console.log(params);

		const response = await fetch(this.url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-amz-json-1.1",
				"X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp",
			},
			body: JSON.stringify({
				ClientId: this.cognitoConfig.settings.client_id,
				Username: email,
				Password: password,
				UserAttributes: [
					{
						Name: "email",
						Value: email,
					},
					{
						Name: "custom:First_name",
						Value: firstName,
					},
					{
						Name: "custom:Last_name",
						Value: lastName,
					},
				],
			}),
		});

		const data = await response.json();
		console.log(" -> Datos", data);

		if (response.ok) {
			return { data };
		} else {
			return { error: data.message };
		}
	}

	async resendConfirmationCode(params: Type.SignUp | any): Promise<Type.Data> {
		const { UserSub } = params;

		const response = await fetch(this.url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-amz-json-1.1",
				"X-Amz-Target": "AWSCognitoIdentityProviderService.ResendConfirmationCode",
			},
			body: JSON.stringify({
				ClientId: this.cognitoConfig.settings.client_id,
				Username: UserSub,
			}),
		});

		const data = await response.json();
		console.log("Código reenviado:", data);

		if (response.ok) {
			return { data };
		} else {
			return { error: data.message };
		}
	}

	async verifyAccount({
		values,
		codeInfo,
	}: {
		values: Type.VerificationCodeForm | any;
		codeInfo: Type.SignUp | any;
	}): Promise<Type.Data> {
		const { code } = values;
		const { UserSub } = codeInfo;

		console.log("-> Values: ", values);
		console.log("-> Validation: ", codeInfo);

		const response = await fetch(this.url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-amz-json-1.1",
				"X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp",
			},
			body: JSON.stringify({
				ClientId: this.cognitoConfig.settings.client_id,
				Username: UserSub,
				ConfirmationCode: code,
			}),
		});

		const data = await response.json();

		if (response.ok) {
			return { data };
		} else {
			return { error: data.message };
		}
	}

	async signInWithOAuth({ provider }: { provider: string }) {
		return { error: "Social authentication not implemented" };
	}

	async signInWithPassword(params: Type.SignInForm | any): Promise<Type.Data> {
		const { email, password } = params;

		const response = await fetch(this.url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-amz-json-1.1",
				"X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
			},
			body: JSON.stringify({
				ClientId: this.cognitoConfig.settings.client_id,
				AuthFlow: "USER_PASSWORD_AUTH",
				AuthParameters: {
					USERNAME: email,
					PASSWORD: password,
				},
			}),
		});

		const data = await response.json();

		if (response.ok) {
			localStorage.setItem("signInData", JSON.stringify(data.AuthenticationResult));
			return { data };
		} else {
			return { error: data.message };
		}
	}

	async resetPassword(_) {
		return { error: "Password reset not implemented" };
	}

	async updatePassword(_) {
		return { error: "Update reset not implemented" };
	}

	async getUser() {
		const signInData = localStorage.getItem("signInData");

		if (!signInData) {
			return { data: { user: null } };
		}

		const accessToken = JSON.parse(signInData).AccessToken;

		const response = await fetch(this.url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-amz-json-1.1",
				"X-Amz-Target": "AWSCognitoIdentityProviderService.GetUser",
			},
			body: JSON.stringify({
				AccessToken: accessToken,
			}),
		});

		const user = await response.json();

		if (response.ok) {
			return { data: { user } };
		} else {
			return { data: { user: null } };
		}
	}

	async signOut() {
		localStorage.removeItem("signInData");
		return {};
	}
}

const cognitoConfig = createUserManager();
export const authClient = new AuthClient(cognitoConfig);
