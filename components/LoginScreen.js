import supabase from '../lib/supabase';
import React from 'react';
import { fetchChannels } from '../lib/fetchData';

import Link from 'next/link';
import UserContext from './UserContext';

export default function LoginScreen() {
  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const userContext = React.useContext(UserContext);

  const signUp = async () => {
    if (!username || !email || !password) {
      setErrorMessage('You must enter all fields to continue');
      return;
    }

    let { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage(null);
      //create a user in the database
      try {
        const id = user.id;
        let result = await supabase.from('users').select('id').match({ id });

        //no existing user found
        if (!result.error && result.body.length === 0) {
          let newUser = await supabase
            .from('users')
            .insert([{ id, username, email }]);
          userContext.setCurrentUser(id);
        }
      } catch (errorDb) {
        console.log(errorDb);
        setErrorMessage(errorDb.message);
      }
    }
  };

  const logIn = async () => {
    if (!email || !password) {
      setErrorMessage('Enter your email and password to log in');
      return;
    }
    let { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      try {
        setErrorMessage(null);
        const id = user.id;
        userContext.setCurrentUser(id);
      } catch (errorDb) {
        console.log(errorDb);
        setErrorMessage(errorDb.message);
      }
    }

    fetchChannels();
  };

  return (
    <div>
      <p>Username</p>
      <input
        onChange={(event) => {
          setUsername(event.currentTarget.value);
        }}
      />
      <p>Email</p>
      <input
        onChange={(event) => {
          setEmail(event.currentTarget.value);
        }}
      />
      <p>Password</p>
      <input
        onChange={(event) => {
          setPassword(event.currentTarget.value);
        }}
        type="password"
      />
      <div>
        <button onClick={signUp}>Sign Up</button>
        <button onClick={logIn}>Log In</button>
      </div>
      <br />
      <span>{errorMessage}</span>
    </div>
  );
}
