import * as React from 'react';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';

export default function AccountSignedIn({ userSession, logout }) {
    const demoSession = {
        user: {
            name: userSession.name,
            email: userSession.email,
            image: 'https://avatars.githubusercontent.com/u/60567205',
            role: userSession.role
        }
    };

    const [session, setSession] = React.useState(demoSession);
    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                console.log('user session', userSession);
                setSession(userSession);
            },
            signOut: () => {
                logout();
                setSession(null);
            },
        };
    }, [userSession, logout]);

    return (
        <AuthenticationContext.Provider value={authentication}>
            <SessionContext.Provider value={session}>
                {/* preview-start */}
                <Account />
                {/* preview-end */}
            </SessionContext.Provider>
        </AuthenticationContext.Provider>
    );
}
