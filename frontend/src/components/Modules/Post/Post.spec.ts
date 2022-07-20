import { render } from '@testing-library/svelte';
import 'jest';
import { generateNChars } from '../../../utils/testFuncs';
import Post from './Post.svelte';

test('Render a post that has a long paragraph', () => {
	const data = {
		user: {
			id: 0,
			honor: 999,
			username: 'EpicGamer',
			profile: '',
			date_created: 'Today'
		},

		id: 0,
		title: 'Lol',
		content: { text: generateNChars(1000) },
		content_type: 'text',
		date_created: ''
	};

	const { getByText } = render(Post, { props: { props: data } });

	expect(getByText('Lol')).toBeTruthy();
});

test('Render a post that has a multiple images', () => {
	const data = {
		user: {
			id: 0,
			honor: 999,
			username: 'EpicGamer',
			profile: '',
			date_created: 'Today'
		},

		id: 0,
		title: 'Lol',
		content: { images: ['img1.png', 'img2.png'] },
		content_type: 'media',
		date_created: ''
	};

	const {} = render(Post, { props: { props: data } });

	// Index is 0
	let imgEl = document.querySelector(`img[src="${data.content.images[0]}"]`)! as HTMLImageElement;
	expect(imgEl).toBeTruthy();

	const nextBtn = document.querySelector('.button[aria-label="Next Image"]')! as HTMLButtonElement;
	nextBtn.click(); // Index is 1

	imgEl = document.querySelector(`img[src="${data.content.images[1]}"]`)! as HTMLImageElement;
	expect(imgEl).toBeTruthy();
});
