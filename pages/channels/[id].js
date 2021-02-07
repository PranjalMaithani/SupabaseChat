import styled from 'styled-components';
import { useRouter } from 'next/router';
import MessageWindow from '../../components/MessageWindow';
import Sidebar from '../../components/Sidebar';

import supabase from '../../lib/supabase';
import useStore from '../../lib/store';

const ChatroomDiv = styled.div`
  display: flex;
`;

export default function Chatroom() {
  const router = useRouter();
  const { id } = router.query;
  const { messages, channels, users } = useStore(id);

  return (
    <ChatroomDiv>
      <Sidebar channels={channels} />
      <MessageWindow messages={messages} />
    </ChatroomDiv>
  );
}
