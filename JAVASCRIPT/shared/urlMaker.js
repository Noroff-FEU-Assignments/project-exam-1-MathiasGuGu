import imageUrlBuilder from 'https://esm.sh/@sanity/image-url';

const PROJECT_ID = 'm8emkq4u';
const DATASET = 'production';

const builder = imageUrlBuilder({
	baseUrl: 'https://cdn.sanity.io',
	projectId: PROJECT_ID,
	dataset: DATASET,
});

export default builder;
