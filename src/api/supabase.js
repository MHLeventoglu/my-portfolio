import { createClient } from '@supabase/supabase-js'

// Supabase URL ve Anon Key - Bu bilgileri .env dosyasından alır
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Supabase istemcisini oluştur
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  if (error) {
    console.error('Supabase Error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred',
      details: error
    };
  }
  return { success: true };
};

// Test bağlantı
export const testConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // First, let's try to list all tables
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (tableError) {
      console.log('Could not fetch table list, trying direct table tests...');
    } else {
      console.log('Available tables:', tables?.map(t => t.table_name));
    }

    // Test each table individually
    const tablesToTest = ['projects', 'experiences', 'skills', 'profiles'];
    const results = {};

    for (const table of tablesToTest) {
      try {
        const { data, error } = await supabase.from(table).select('count(*)', { count: 'exact' });
        if (error) {
          results[table] = `❌ Error: ${error.message}`;
        } else {
          results[table] = `✅ Exists (count: ${data?.length || 0})`;
        }
      } catch (err) {
        results[table] = `❌ Error: ${err.message}`;
      }
    }

    console.log('Table test results:', results);
    return results;
  } catch (err) {
    console.warn('Supabase connection test error:', err.message);
    return false;
  }
};
