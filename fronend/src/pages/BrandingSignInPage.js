import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { fetchCurrentUserProfile, signIn } from '../api/userprofile';

export default function BrandingSignInPage() {
    const { login } = useUser();
    const navigate = useNavigate();
    const theme = useTheme();
    const providers = [
        { id: 'credentials', name: 'Email and Password' }
    ];

    // preview-start
    const BRANDING = {
        logo: (
            <img
                src="https://mui.com/static/logo.svg"
                alt="MUI logo"
                style={{ height: 24 }}
            />
        ),
        title: 'Mitra',
    };

    const handleSignIn = async (provider, formData) => {
        const promise = new Promise((resolve) => {
            const email = formData?.get('email');
            const password = formData?.get('password');
            signIn({ email, password }).then((data) => {
                if (data) {
                    localStorage.setItem('token', data.token);
                    // Fetch user profile on successful login
                    fetchCurrentUserProfile().then((data) => {
                        login(data);
                    }).catch(err => {
                        console.log(err);
                    })

                    navigate('/');
                }
            }).catch((err) => {
                console.log(err);
                resolve({
                    type: 'CredentialsSignin',
                    error: 'Invalid credentials.',
                });
            });
        });
        return promise;
    };

    return (
        // preview-start
        <AppProvider branding={BRANDING} theme={theme}>
            <SignInPage signIn={handleSignIn} providers={providers} />
        </AppProvider>
        // preview-end
    );
}
