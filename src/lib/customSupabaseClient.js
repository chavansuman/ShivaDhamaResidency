import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://igkdjtmcychevvaldkwf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2RqdG1jeWNoZXZ2YWxka3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NjcxMjgsImV4cCI6MjA4MjM0MzEyOH0.0PuYxw9-51ibbNWM3ph86K0ISWq6KT1S1V2JOXtIzGc';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export {
    customSupabaseClient,
    customSupabaseClient as supabase,
};
