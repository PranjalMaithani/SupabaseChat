import styled from "styled-components";
import colors from "./colors";

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  font-weight: 200;
`;

const MessageAuthor = styled.p`
  color: ${colors.cyan};
  margin: 2px 0;
  font-size: 1.1em;
  font-weight: 400;
`;

//message obj -> message, user_id, inserted_at, channel_id, id
export default function Message({ message }) {
  return (
    <MessageDiv>
      <MessageAuthor>{message.author}</MessageAuthor>
      <p>{message.message}</p>
    </MessageDiv>
  );
}
