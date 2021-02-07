import styled from 'styled-components';

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageAuthor = styled.p`
  color: blue;
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
