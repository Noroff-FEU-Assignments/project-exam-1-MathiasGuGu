import client from './shared/builder.js';
import builder from './shared/urlMaker.js';

const ALLPOSTS = document.querySelector('.posts');

/* *[_type == "comment" && _ref == post._id && approved == true] */
/* use This to get specific posts comment */

const urlFor = (source) => builder.image(source);

const fetchAllPosts = async () => {
	const data = await client.fetch("*[_type == 'post']");

	if (data !== undefined) {
		const loader = document.querySelector('.loader');
		loader?.remove();
	}

	for (let post in data) {
		console.log(data);
		let post_html = `
		<div class="post-card">
					<img src="${urlFor(data[post].mainImage.asset._ref)}
					" class="post-card-image"></img>
					<div class="post-card-text">
						<p>${data[post].timeToRead} minute read - ChatGPT</p>
						<h2>${data[post].title}</h2>
						
					</div>
					<a href="/post.html?slug=${data[post].slug.current}">
					<div class="blue-button post-button">
						read now <i class="fa-solid fa-arrow-right"></i>
					</div>
					</a>
				</div>
	`;

		console.log(post_html);

		ALLPOSTS.innerHTML += post_html;
	}
};

const fetchPostComments = async () => {
	const data = client.fetch(
		"*[_type == 'comment' && _ref == post._id && approved == true]"
	);
};

fetchAllPosts();
