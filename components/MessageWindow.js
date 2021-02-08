import { useEffect, useRef } from "react";
import styled from "styled-components";
import Message from "./Message";
import MessageInput from "./MessageInput";

const MessagesWrapper = styled.div`
  height: 85%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
`;

const MessagesDiv = styled.div`
  padding-left: 30px;
  display: flex;
  flex-direction: column;
`;

//message obj -> message, user_id, inserted_at, channel_id, id
export default function MessageWindow({ messages }) {
  const divRef = useRef();
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <MessagesWrapper ref={divRef}>
      <MessagesDiv>
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </MessagesDiv>
    </MessagesWrapper>
  );
}
