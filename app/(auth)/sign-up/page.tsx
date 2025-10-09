'use client';

import { CountrySelectField } from '@/components/forms/CountrySelectField';
import FooterLInk from '@/components/forms/FooterLInk';
import InputField from '@/components/forms/InputField';
import SelectField from '@/components/forms/SelectField';
import { Button } from '@/components/ui/button';
import {
	INVESTMENT_GOALS,
	PREFERRED_INDUSTRIES,
	RISK_TOLERANCE_OPTIONS,
} from '@/lib/constants';
import { useForm } from 'react-hook-form';

const SignUp = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			country: 'US',
			investmentGoals: 'Growth',
			riskTolerance: 'Medium',
			preferredIndustry: 'Technology',
		},
		mode: 'onBlur',
	});

	const onSubmit = async (data: SignUpFormData) => {
		try {
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h1 className='form-title'>Sign Up & Personalize</h1>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				{/* Inputs */}
				<InputField
					name='fullName'
					label='full name'
					placeholder='John Doe'
					register={register}
					error={errors.fullName}
					validation={{ required: 'Full name is required', minLength: 2 }}
				/>
				<InputField
					name='email'
					label='email'
					type='email'
					placeholder='johnDoe@gmail.com'
					register={register}
					error={errors.email}
					validation={{
						required: 'Email name is required',
						pattern: /^\w+@\w+\.\w+$/,
						message: 'Email address is required',
					}}
				/>
				<InputField
					name='password'
					label='password'
					placeholder='Enter a strong password'
					type='password'
					register={register}
					error={errors.password}
					validation={{ required: 'Password is Required', minLength: 8 }}
				/>

				<CountrySelectField
					name='country'
					label='country'
					control={control}
					error={errors.country}
					required
				/>

				<SelectField
					name='investmentGoals'
					label='investment goals'
					placeholder='Select you investment goal'
					options={INVESTMENT_GOALS}
					control={control}
					error={errors.investmentGoals}
					required
				/>
				<SelectField
					name='riskTolerance'
					label='risk tolerance'
					placeholder='Select your risk level'
					options={RISK_TOLERANCE_OPTIONS}
					control={control}
					error={errors.riskTolerance}
					required
				/>
				<SelectField
					name='preferredIndustry'
					label='preferred industry'
					placeholder='Select your preferred industry'
					options={PREFERRED_INDUSTRIES}
					control={control}
					error={errors.preferredIndustry}
					required
				/>
				<Button
					type='submit'
					disabled={isSubmitting}
					className='yellow-btn w-full mt-5'>
					{isSubmitting ? 'Creating account' : 'Start your Investing journey'}
				</Button>

				<FooterLInk
					text='Already have an account?'
					linkText='Sign In'
					href='/sign-in'
				/>
			</form>
		</>
	);
};

export default SignUp;
