"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

import { paths } from "@/paths";
import { authClient } from "@/lib/custom-auth/client";
import * as Type from "@/lib/definitions";
import { useAuth } from "@/components/auth/custom/auth-context";
import { RouterLink } from "@/components/core/link";
import { DynamicLogo } from "@/components/core/logo";
import { toast } from "@/components/core/toaster";

const schema = zod.object({
	code: zod.string().min(6, { message: "Code should be 6 digit" }).max(6, { message: "Code should be 6 digit" }),
});

const defaultValues = { code: "" };

export function SignUpVerificationCodeForm({ validationInfo }: Readonly<{ validationInfo: Type.SignUp }>) {
	const auth = useAuth();
	const [isPending, setIsPending] = React.useState(false);
	const [codeInfo, setCodeInfo] = React.useState<Type.SignUp>(validationInfo);

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ defaultValues, resolver: zodResolver(schema) });

	React.useEffect(() => {
		if (validationInfo) {
			setCodeInfo(validationInfo);
		}
	}, [validationInfo]);

	const onSubmit = React.useCallback(
		async (values: Type.VerificationCodeForm) => {
			setIsPending(true);

			const { data, error } = await authClient.verifyAccount({ values, codeInfo });

			if (error) {
				setError("root", { type: "server", message: error });
				setIsPending(false);
				return;
			}

			// Update the user in the auth context so client components that depend on it can re-render.
			// On update the sign-in page component will automatically redirect to the dashboard.
			auth.setUser(data);
		},
		[auth, setError, codeInfo]
	);

	return (
		<Stack spacing={4}>
			<div>
				<Box component={RouterLink} href={paths.home} sx={{ display: "inline-block", fontSize: 0 }}>
					<DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
				</Box>
			</div>
			<Stack spacing={1}>
				<Typography variant="h5">Confirm your account</Typography>
				<Typography color="text.secondary" variant="body2">
					We have sent a code in an Email message to {validationInfo.CodeDeliveryDetails?.Destination}. To confirm your
					account, enter your code.
				</Typography>
			</Stack>
			<Stack spacing={3}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={2}>
						<Controller
							control={control}
							name="code"
							render={({ field }) => (
								<FormControl error={Boolean(errors.code)}>
									<InputLabel>Code</InputLabel>
									<OutlinedInput {...field} type="text" />
									{errors.code ? <FormHelperText>{errors.code.message}</FormHelperText> : null}
								</FormControl>
							)}
						/>
						{errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
						<Button
							sx={{ minWidth: "auto", alignSelf: "flex-end", p: "6px 12px" }}
							disabled={isPending}
							variant="text"
							onClick={async () => {
								const { error } = await authClient.resendConfirmationCode(codeInfo);
								if (error) {
									toast.error(error);
								} else {
									toast.success("Code resent successfully");
								}
							}}
						>
							Resend code
						</Button>
						<Button disabled={isPending} type="submit" variant="contained">
							Confirm account
						</Button>
					</Stack>
				</form>
			</Stack>
		</Stack>
	);
}
