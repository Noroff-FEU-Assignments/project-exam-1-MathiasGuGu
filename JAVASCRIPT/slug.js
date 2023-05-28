import client from './shared/builder.js';
import builder from './shared/urlMaker.js';
const postContainer = document.querySelector('.post-text-container');
const commentsForm = document.querySelector('.comments-form');
const comments = document.querySelector('.comments');
const postImg = document.querySelector('#post-img');

const urlFor = (source) => builder.image(source);

const slug = window.location.href.split('=')[1].trim();

document.title = slug.replace('-', ' ');

const data = await client.fetch(
	`*[_type == "post" && slug.current == "${slug}"]`
);

const _ref = data[0]._id;

const subscription = await client
	.listen(`*[_type == 'comment' && post._ref == "${_ref}"]`)
	.subscribe((update) => {
		let div = document.createElement('div');
		let h2 = document.createElement('h2');

		let para = document.createElement('p');

		let com = update.result;
		console.log(com);
		h2.innerText = com.comment;
		para.innerText = com.name + '   ' + com._updatedAt;

		div.classList.add('comment');
		div.appendChild(h2);
		div.appendChild(para);

		comments.appendChild(div);
	});

const fetchSinglePost = async () => {
	if (data !== undefined) {
		const loader = document.querySelector('.loader');
		loader?.remove();
	}

	postImg.src = `${urlFor(data[0].mainImage.asset._ref)}`;

	const html = `
			<article class="post-text">
				<h1>
                ${data[0].title}
				</h1>
                ${data[0].body
					.map((child) => {
						return `<p>${child.children[0].text}</p>`;
					})
					.join('')}
			</article>
    `;
	postContainer.innerHTML = html;
};

const clearComments = () => {
	comments.innerHTML = '';
};

const postComment = async (comment) => {
	const doc = {
		_type: 'comment',
		name: 'Reader',
		approved: false,
		comment: comment,
		post: { _ref, _type: 'reference' },
	};

	await client.create(doc);
};

commentsForm?.addEventListener('submit', (e) => {
	e.preventDefault();
	const text = e.target[0].value;
	if (text.length >= 5) {
		postComment(text);
	}
	e.target[0].value = '';
});

const getAllComments = async () => {
	const data = await client.fetch(
		`*[_type == 'comment' && post._ref == "${_ref}"]`
	);

	console.log(data);

	if (data !== undefined) {
		const loader = document.querySelector('.comment-loader');
		loader?.remove();
	}

	/* *[_type == "comment" && _ref == post._id && approved == true] */
	data.forEach((comment) => {
		let div = document.createElement('div');
		div.classList.add('comment');

		let h2 = document.createElement('h2');

		let para = document.createElement('p');
		h2.innerText = comment.comment;
		para.innerText = comment.name;

		div.appendChild(h2);
		div.appendChild(para);

		comments.appendChild(div);
	});
};

fetchSinglePost(slug);
getAllComments();

postImg?.addEventListener('click', () => {
	document.body.innerHTML += `
        <div class="backdrop" style="background-image: url(${postImg.src})">
        </div>
        <img class="modal" src="${postImg.src}"></img>

    `;
	const backdrop = document.querySelector('.backdrop');
	const modal = document.querySelector('.modal');
	backdrop?.addEventListener('click', () => {
		backdrop.remove();
		modal?.remove();
	});
});
