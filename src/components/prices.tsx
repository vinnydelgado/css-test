import React from 'react';
import { Amplify } from 'aws-amplify';
import Header from './header';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../aws-exports';
Amplify.configure(config);





export function Prices({ signOut, user }: WithAuthenticatorProps) {
    return (
      <>
      <Header></Header>
        <h1>PAGE FOR STRIPE API CALLS</h1>
      </>
    );
  }
  
  export default withAuthenticator(Prices);