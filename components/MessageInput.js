import styled from 'styled-components';
import supabase from '../lib/supabase';
import UserContext from './UserContext';
import { addMessage } from '../lib/addData';
import { useContext } from 'react';
import { useRouter } from 'next/router';

const Input = styled.input`
  width: 100%;
  height: 32px;
  font-size: 16px;
`;

export default function MessageInput({ onSubmit }) {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query; //channel id
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event.currentTarget.input.value);
        event.currentTarget.input.value = '';
      }}
    >
      <Input name="input" autoComplete="off" />
    </form>
  );
}
