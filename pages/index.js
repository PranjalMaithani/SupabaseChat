import Head from 'next/head';
import React from 'react';
import styles from '../styles/Home.module.css';

import supabase from '../components/supabase';

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default function HomeScreen() {
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const signUp = async () => {
    try {
      let { user, error } = await supabase.auth.signUp({
        email: username,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logIn = async () => {
    try {
      let { user } = await supabase.auth.signIn({
        email: username,
        password: password,
      });
      console.log('logged in');
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p>Username</p>
      <input
        onChange={(event) => {
          setUsername(event.currentTarget.value);
        }}
      />
      <p>Password</p>
      <input
        onChange={(event) => {
          setPassword(event.currentTarget.value);
        }}
        type="password"
      />
      <Button text="Sign Up" onClick={signUp} />
      <Button text="Log In" onClick={logIn} />
    </div>
  );
}
