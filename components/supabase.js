import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_API_URL;
const supabaseKey = process.env.NEXT_PUBLIC_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
