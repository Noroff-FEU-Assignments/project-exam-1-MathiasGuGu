import client from './shared/builder.js';
import builder from './shared/urlMaker.js';
const postContainer = document.querySelector('.post-container');

const urlFor = (source) => builder.image(source);

const slug = window.location.href.split('=')[1].trim();

console.log(slug);
const fetchSinglePost = async (slug) => {
	const data = await client.fetch(
		`*[_type == "post" && slug.current == "${slug}"]`
	);
	console.log(data);
	const html = `
    <section class="header-image-container">
			<img src="${urlFor(data[0].mainImage.asset._ref)}" />
		</section>
		<section class="post-text-container">
			<article class="post-text">
				<h1>
                ${data[0].title}
				</h1>
				<p>
                ${data[0].body.map((child) => {
					console.log(child);
					return `<p>${child.children[0].text}</p>`;
				})}
				</p>
			</article>
		</section>
    `;
	postContainer.innerHTML = html;
};

fetchSinglePost(slug);
