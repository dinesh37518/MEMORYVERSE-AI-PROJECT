import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  supabaseUrl: process.env.SUPABASE_URL || 'https://witsvurabxsfnznsoydn.supabase.co',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpdHN2dXJhYnhzZm56bnNveWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NzE0MDgsImV4cCI6MjEwMTA0NzQwOH0.b9cnBJFkfmrytUcMlo978uNKhP13zvnVd09O1CxmbFk',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  groqApiKey: process.env.GROQ_API_KEY || '',
  emailJsServiceId: process.env.EMAILJS_SERVICE_ID || 'service_jsoxu36',
  emailJsTemplateId: process.env.EMAILJS_TEMPLATE_ID || 'template_fikdtgi',
  emailJsPublicKey: process.env.EMAILJS_PUBLIC_KEY || 'i1Wq-xCqrmrzM3xLx',
};
