import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router,Routes,Route,NavLink} from 'react-router-dom';
import Auth from 'aws-amplify';
import React from 'react';
import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../aws-exports';
import './header.css';
Amplify.configure(config);


export function Header({ signOut, user }: WithAuthenticatorProps) {
   

    return (
        <header>
            <NavLink to="/Home"> Home</NavLink>

            <NavLink to="/Profile"> Profile</NavLink>

            <NavLink to="/Prices"> Pricing</NavLink>
        </header>
    )
}

export default withAuthenticator(Header);
