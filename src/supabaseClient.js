import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);


// // supabaseClient.js (or .ts)
// import { createClient } from "@supabase/supabase-js";

// // Use your own Supabase project URL and anonymous key
// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error("Supabase URL and Key are required!");
// }

// export const supabase = createClient(supabaseUrl, supabaseKey);



