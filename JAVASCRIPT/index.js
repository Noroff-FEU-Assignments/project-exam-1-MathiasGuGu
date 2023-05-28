import builder from './shared/urlMaker.js';
import client from './shared/builder.js';

const hero = document.querySelector('.hero');
const carousel = document.querySelector('.post-carousel');

const urlFor = (source) => builder.image(source);

const fetchHeroPost = async () => {
	const data = await client.fetch("*[_type == 'post']");

	const HTML = `
    <div class="hero-card">
					<img src=${urlFor(data[0].mainImage.asset._ref)} class="hero-image"></img>
					<div class="hero-text">
						<div>
							<h2 class="hero-title">
								${data[0].title}
							</h2>
							<p class="hero-read-info">
								${data[0].timeToRead} minute read - ChatGPT 23.05.23
							</p>
							<p class="hero-about">
								${data[0].body[0].children[0].text}
							</p>
						</div>
						<div class="hero-tags-container"></div>

						<a href="/post.html?slug=${data[0].slug.current}" class="blue-button">
							Read now <i class="fa-solid fa-arrow-right"></i>
						</a>
					</div>
				</div>
    
    `;

	hero.innerHTML = HTML;
};

const populateCarousel = async () => {
	const data = await client.fetch(
		`
        *[_type == "post"][0...6]
    `
	);
	if (data !== undefined) {
		const loader = document.querySelector('.loader');
		loader?.remove();
	}
	for (let post in data) {
		const HTML = `
        <div class="post-card">
                    <img src="${urlFor(
						data[post].mainImage.asset._ref
					)}" class="post-card-image"></img>
                    <div class="post-card-text">
                        <p>${data[post].timeToRead} minute read - ChatGPT</p>
                        <h2 class="post-card-title">${data[post].title}</h2>
                        <p>
                            ${data[post].body[0].children[0].text}
                        </p>
                    </div>
                    <a href="/post.html?slug=${
						data[post].slug.current
					}" class="blue-button">
                        read now <i class="fa-solid fa-arrow-right"></i>
                    </a>
        </div>
`;
		carousel.innerHTML += HTML;
	}
};

populateCarousel();
fetchHeroPost();
