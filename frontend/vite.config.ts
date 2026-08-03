import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/MEMORYVERSE-AI-PROJECT/',
  define: {
    'import.meta.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify('service_jsoxu36'),
    'import.meta.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify('template_fikdtgi'),
    'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify('i1Wq-xCqrmrzM3xLx'),
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://witsvurabxsfnznsoydn.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpdHN2dXJhYnhzZm56bnNveWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NzE0MDgsImV4cCI6MjEwMTA0NzQwOH0.b9cnBJFkfmrytUcMlo978uNKhP13zvnVd09O1CxmbFk')
  }
})
