import styled from 'styled-components';
import { useRouter } from 'next/router';
import MessageWindow from '../../components/MessageWindow';
import MessageInput from '../../components/MessageInput';
import Sidebar from '../../components/Sidebar';

import supabase from '../../lib/supabase';
import useStore from '../../lib/store';
import UserContext from '../../components/UserContext';
import { addMessage } from '../../lib/addData';
import { useCallback, useContext } from 'react';

const ChatroomDiv = styled.div`
  display: flex;
`;

export default function Chatroom() {
  const router = useRouter();
  const { id } = router.query;
  const { messages, channels, users } = useStore(id);
  const userContext = useContext(UserContext);

  const addNewMessage = useCallback(
    (text) => {
      addMessage(text, userContext.currentUser, id);
    },
    [id],
  );

  const logOut = useCallback(async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      userContext.setCurrentUser(null);
      router.replace('/');
    }
  });

  return (
    <ChatroomDiv>
      <Sidebar channels={channels} onLogOut={logOut} />
      <div>
        <MessageWindow messages={messages} />
        <MessageInput
          onSubmit={(text) => {
            addNewMessage(text);
          }}
        />
      </div>
    </ChatroomDiv>
  );
}
