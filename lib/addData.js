import supabase from "./supabase";

export const addMessage = async (message, user_id, channel_id) => {
  try {
    await supabase.from("messages").insert([{ message, user_id, channel_id }]);
  } catch (error) {
    console.log(error);
  }
};

export const addChannel = async (slug) => {
  slug = slugify(slug);
  if (slug === "") {
    return;
  }
  try {
    await supabase.from("channels").insert([{ slug }]);
  } catch (error) {
    console.log(error);
  }
};

function slugify(name) {
  return name
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
