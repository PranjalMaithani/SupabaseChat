import supabase from './supabase';

export const addMessage = async (message, user_id, channel_id) => {
  try {
    await supabase.from('messages').insert([{ message, user_id, channel_id }]);
  } catch (error) {
    console.log(error);
  }
};
