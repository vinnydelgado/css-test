import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Flex, Button } from '@radix-ui/themes';
import config from '../aws-exports';
import './header.css';

Amplify.configure(config);

export function Header({ signOut, user }: WithAuthenticatorProps) {
  return (
    <header>
      <Flex justify="between" align="center" py="4" px="6">
        <Flex gap="4">
          <NavLink to="/Home">Home</NavLink>
          <NavLink to="/Profile">Profile</NavLink>
          <NavLink to="/Prices">Pricing</NavLink>
        </Flex>
        <Flex align="center" gap="4">
          {user && <span>Welcome, {user.username}</span>}
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
      </Flex>
    </header>
  );
}

export default withAuthenticator(Header);
