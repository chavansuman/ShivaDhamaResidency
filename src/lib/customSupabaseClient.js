import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xisbsxjgaygnpztlktut.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpc2JzeGpnYXlnbnB6dGxrdHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NDk1NDgsImV4cCI6MjA4MTMyNTU0OH0.TjW_H-S5wtmNNycYuJys2g0EVuQgftavDaWXI0J34CA';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
