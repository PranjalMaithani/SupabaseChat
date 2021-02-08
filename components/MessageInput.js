import styled from "styled-components";
import supabase from "../lib/supabase";
import UserContext from "./UserContext";
import { addMessage } from "../lib/addData";
import { useContext } from "react";
import { useRouter } from "next/router";

import { Input } from "./Styles";

const InputChatForm = styled.form`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const InputChat = styled(Input)`
  width: 95%;
  height: 42px;
  font-size: 1.2rem;
  padding: 10px;
`;

export default function MessageInput({ onSubmit }) {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query; //channel id
  return (
    <InputChatForm
      onSubmit={(event) => {
        event.preventDefault();
        const text = event.currentTarget.input.value;
        if (text !== "") {
          onSubmit(event.currentTarget.input.value);
          event.currentTarget.input.value = "";
        }
      }}
    >
      <InputChat name="input" autoComplete="off" />
    </InputChatForm>
  );
}
