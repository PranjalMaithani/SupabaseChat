import supabase from './supabase';
import { useEffect, useState } from 'react';
import { fetchChannels, fetchMessages, fetchUsers } from './fetchData';

export default function useStore(channelId) {
  const [messsages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState({});
  const [newMessage, setNewMessage] = useState(null);
  const [newChannel, setNewChannel] = useState(null);
  const [newUser, setNewUser] = useState(null);

  //fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      const fetchedChannels = await fetchChannels();
      setChannels(fetchedChannels);

      const fetchedUsers = await fetchUsers();
      const usersObj = {};

      fetchedUsers.forEach((user) => {
        usersObj[user.id] = { username: user.username };
      });
      setUsers(usersObj);

      //listeners for realtime

      const messageListener = supabase
        .from('messages')
        .on('INSERT', (payload) => {
          console.log(payload);
        })
        .subscribe();

      const channelListener = supabase
        .from('channels')
        .on('*', (payload) => {
          console.log('Change received!', payload);
        })
        .subscribe();

      const userListener = supabase
        .from('users')
        .on('*', (payload) => {
          console.log('Change receivedr!', payload);
        })
        .subscribe();

      return () => {
        messageListener.unsubscribe();
        channelListener.unsubscribe();
        userListener.unsubscribe();
      };
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchChannelMessages = async () => {
      if (channelId) {
        const fetchedMessages = await fetchMessages(channelId);
        setMessages(fetchedMessages);
      }
    };
    fetchChannelMessages();
  }, [channelId]);

  return {
    messages: messsages.map((message) => {
      if (users[message.user_id])
        return {
          ...message,
          author: users[message.user_id].username,
        };
      else return message;
    }),
    channels: channels,
    users: users,
  };
}
