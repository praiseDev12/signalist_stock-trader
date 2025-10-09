export const signInWithEmail = async ({ email, password }: SignInFormData) => {
	try {
		console.log('Sing in');
	} catch (e) {
		console.log('Sign in failed', e);
		return { success: false, error: 'Sign in failed' };
	}
};

export const signUpWithEmail = async ({
	email,
	password,
	fullName,
	country,
	investmentGoals,
	riskTolerance,
	preferredIndustry,
}: SignUpFormData) => {
	try {
		console.log('Sing up with email');
	} catch (e) {
		console.log('Sign up failed', e);
		return { success: false, error: 'Sign up failed' };
	}
};
