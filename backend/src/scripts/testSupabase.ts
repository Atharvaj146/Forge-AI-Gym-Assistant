import dotenv from 'dotenv';

dotenv.config();

async function test() {
  try {
    const { supabase } = await import('../lib/supabase');
    console.log('SUPABASE_URL=', process.env.SUPABASE_URL ? 'present' : 'missing');
    const res = await supabase.auth.signUp({ email: 'swanandnalawade08@gmail.com', password: 'Testpass123!' });
    console.log('supabase response:', res);
  } catch (err) {
    console.error('test failed:', err);
  }
}

test().then(() => process.exit(0));
