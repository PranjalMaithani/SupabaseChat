import styled from "styled-components";
import { useRouter } from "next/router";
import MessageWindow from "../../components/MessageWindow";
import MessageInput from "../../components/MessageInput";
import Sidebar from "../../components/Sidebar";

import supabase from "../../lib/supabase";
import useStore from "../../lib/store";
import UserContext from "../../components/UserContext";
import { addMessage, addChannel } from "../../lib/addData";
import { useCallback, useContext, useState } from "react";
import Modal from "../../components/Modal";

const ChatroomDiv = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`;

const MessagesDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  overflow-y: hidden;
`;

export default function Chatroom() {
  const router = useRouter();
  const { id } = router.query;
  const { messages, channels, users } = useStore(id);
  const userContext = useContext(UserContext);

  const [modal, setModal] = useState(null);

  const addNewMessage = useCallback(
    (text) => {
      addMessage(text, userContext.currentUser, id);
    },
    [id]
  );

  const addNewChannel = useCallback(() => {
    setModal("addChannel");
  }, []);

  const logOut = useCallback(async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      userContext.setCurrentUser(null);
      router.replace("/");
    }
  });

  return (
    <ChatroomDiv>
      <Sidebar
        channels={channels}
        onLogOut={logOut}
        onAddChannel={addNewChannel}
      />
      <MessagesDiv>
        <MessageWindow messages={messages} />
        <MessageInput
          onSubmit={(text) => {
            addNewMessage(text);
          }}
        />
      </MessagesDiv>
      {modal && (
        <Modal
          name="Add new channel"
          input="Channel name"
          onConfirm={(value) => {
            addChannel(value);
          }}
          onCancel={() => {
            setModal(null);
          }}
        />
      )}
    </ChatroomDiv>
  );
}
