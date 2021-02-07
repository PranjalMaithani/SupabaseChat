import { Children } from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';

const MessagesDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

//message obj -> message, user_id, inserted_at, channel_id, id
export default function MessageWindow({ messages }) {
  return (
    <MessagesDiv>
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </MessagesDiv>
  );
}
