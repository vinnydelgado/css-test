import React from 'react';
import { Amplify } from 'aws-amplify';
import Header from './header';
import { useState , useEffect} from "react";
import {useForm} from "react-hook-form";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { FetchUserAttributesOutput } from 'aws-amplify/auth';
import {updateUserAttribute,type UpdateUserAttributeOutput} from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { useMutation } from "react-query";
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../aws-exports';
import { Theme, Flex, Text, Button, Grid, TextArea ,TextField,} from '@radix-ui/themes';
import axios from 'axios';
import '@radix-ui/themes/styles.css';
Amplify.configure(config);



export function Profile({ signOut, user ,}: WithAuthenticatorProps) {
  const [attributes, setAttributes] = useState<FetchUserAttributesOutput>();
  const[changeUsername,setChangeUsername] = useState("");




  async function handleUpdateUserAttribute(attributeKey: string, value: string) {
    try {
      const output = await updateUserAttribute({
        userAttribute: {
          attributeKey,
          value
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
   

  useEffect(() => {
    async function handleFetchUserAttributes() {
      try {
        setAttributes(await fetchUserAttributes());
      } catch (error) {
        console.log(error);
      }
    }
    handleFetchUserAttributes();
  }, []);

  return (
    <>
    <Theme>
      <Header></Header>
        <h1>Profile</h1>
        <br></br>
        <h1>profile picture</h1>
        <h1>Email: {attributes?.email}</h1>        
        <h1>Username: {attributes?.preferred_username}</h1> 
        <input  value={changeUsername} onChange={(e) => setChangeUsername(e.target.value)} />      
        <Button onClick={() => handleUpdateUserAttribute("preferred_username", changeUsername)}>Update Username</Button>
        <h1>Member since: DYNAMO DB</h1>
        <h1>Subscription: DYNAMO DB</h1>
        <h1>Saved works: DYANMO DB OR S3</h1>
        <Button onClick={signOut}>Sign out</Button>
    </Theme>
    </>
  );
}
//onChange={(e) => setChangeUsername(e.target.value)}
export default withAuthenticator(Profile);
  