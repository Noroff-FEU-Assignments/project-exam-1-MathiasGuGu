import { createClient } from 'https://esm.sh/@sanity/client';

const PROJECT_ID = 'm8emkq4u';
const DATASET = 'production';

const client = createClient({
	projectId: PROJECT_ID,
	dataset: DATASET,
	useCdn: true, // set to `false` to bypass the edge cache
	apiVersion: '2023-05-23', // use current date (YYYY-MM-DD) to target the latest API version
});

export default client;
