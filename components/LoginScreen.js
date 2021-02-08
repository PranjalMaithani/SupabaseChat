import supabase from "../lib/supabase";
import React, { useEffect } from "react";
import { fetchChannels } from "../lib/fetchData";

import Link from "next/link";
import UserContext from "./UserContext";

import styled from "styled-components";
import { Button, Input } from "./Styles";

import colors from "./colors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  outline: 2px solid black;
  box-shadow: 2px 3px 2px black;
  padding: 20px;
  background-color: ${colors.darkGrey};
  width: 100%;
  max-width: 328px;
`;

const LoginForm = styled.div`
  width: 288px;
  font-size: 0.9em;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: end;
  grid-gap: 14px;
`;

const ErrorMessage = styled.div`
  color: black;
  font-family: monospace;
  padding: 10px;
  margin: 5px;
  display: flex;
  justify-content: center;
  margin-top: 375px;
`;

export default function LoginScreen() {
  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const [allowed, setAllowed] = React.useState(null);

  useEffect(() => {
    if (email && password && username) {
      setAllowed("all");
    } else if (email && password) {
      setAllowed("login");
    } else {
      setAllowed(null);
    }
  }, [email, password, username]);

  const userContext = React.useContext(UserContext);

  const signUp = async () => {
    if (!username || !email || !password) {
      setErrorMessage("You must enter all fields to continue");
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
        let result = await supabase.from("users").select("id").match({ id });

        //no existing user found
        if (!result.error && result.body.length === 0) {
          let newUser = await supabase
            .from("users")
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
      setErrorMessage("Enter your email and password to log in");
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
    <>
      <Wrapper>
        <LoginForm>
          <p>Username</p>
          <Input
            onChange={(event) => {
              setUsername(event.currentTarget.value);
            }}
          />
          <p>Email</p>
          <Input
            onChange={(event) => {
              setEmail(event.currentTarget.value);
            }}
          />
          <p>Password</p>
          <Input
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
            type="password"
          />
          <ButtonsWrapper>
            <Button
              onClick={signUp}
              className={`${allowed === "all" ? "confirm tilt" : "disabled"}`}
            >
              Sign Up
            </Button>
            <Button
              onClick={logIn}
              className={`${
                allowed === "all" || allowed === "login"
                  ? "alternate tilt"
                  : "disabled"
              }`}
            >
              Log In
            </Button>
          </ButtonsWrapper>
        </LoginForm>
      </Wrapper>
      {errorMessage && (
        <ErrorMessage className="cancel">{errorMessage}</ErrorMessage>
      )}
    </>
  );
}
