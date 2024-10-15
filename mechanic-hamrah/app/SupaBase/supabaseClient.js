import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rwnnfrrdznfqtebiarln.supabase.co"; 
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bm5mcnJkem5mcXRlYmlhcmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5OTEyMzYsImV4cCI6MjA0NDU2NzIzNn0.FXnnlJhPOpUBCq64JZHstSW2W8Vo8VoZAsEJq9gl5kA";
export const supabase = createClient(supabaseUrl, supabaseKey);
