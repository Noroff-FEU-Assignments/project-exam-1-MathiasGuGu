import { createClient } from 'https://esm.sh/@sanity/client';

const PROJECT_ID = 'm8emkq4u';
const DATASET = 'production';

const client = createClient({
	projectId: PROJECT_ID,
	dataset: DATASET,
	token: 'skNFqvT8gcOuLAESQ4gIWGcbSXoH3xiSDFT0kSR7jgMYd0mogynIsajH2V4Qo0cRKwSpbsaM8KJFgVr87BhvFkAzHHgSb5tAf8Pv1IbdFuFglwpPc3CMnw10Hy4LL25GREMT9NQOvOTabzEDrICokbRFDSZ96ann41KTq94RaBmZ3QUdYBJt',
	useCdn: true, // set to `false` to bypass the edge cache
	apiVersion: '2023-05-23', // use current date (YYYY-MM-DD) to target the latest API version
});

export default client;
