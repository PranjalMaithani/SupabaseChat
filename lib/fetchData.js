import supabase from './supabase';

export const fetchChannels = async () => {
  let { data: channels, error } = await supabase.from('channels').select('*'); //obj -> id, slug
  if (error) {
    console.log(error);
    return [];
  } else {
    return channels;
  }
};

export const fetchUsers = async () => {
  let { data: users, error } = await supabase.from('users').select('*'); //obj -> id, username, status
  if (error) {
    console.log(error);
    return [];
  } else {
    return users;
  }
};

export const fetchMessages = async (channelId) => {
  //obj -> message, user_id, inserted_at, channel_id, id
  let { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .eq('channel_id', channelId)
    .order('inserted_at', { ascending: true });
  if (error) {
    console.log(error);
    return [];
  } else {
    return messages;
  }
};
