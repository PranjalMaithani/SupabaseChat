import Head from 'next/head';
import React, { useContext } from 'react';
import styles from '../styles/Home.module.css';

import LoginScreen from '../components/LoginScreen';
import Router from 'next/router';
import UserContext from '../components/UserContext';

export default function App() {
  const user = useContext(UserContext);
  if (!user.currentUser) {
    return <LoginScreen />;
  } else {
    Router.push({
      pathname: '/channels/1',
    });
    return <p>Loading...</p>;
  }
}
