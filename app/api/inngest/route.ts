import { inngest } from '@/lib/ingest/client';
import { sendSignUpEmail } from '@/lib/ingest/funtions';
import { serve } from 'inngest/next';

export const { GET, POST, PUT } = serve({
	client: inngest,
	functions: [sendSignUpEmail],
});
