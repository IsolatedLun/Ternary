import { render } from '@testing-library/svelte';
import 'jest';
import { generateNChars } from '../../../utils/testFuncs';
import Post from './Post.svelte';
import type {
	Props_Post,
	Props_PostComment,
	Props_Post_Content_Image,
	Props_Post_Content_Text
} from './types';

test('Render a post that has a long paragraph', () => {
	const data: Props_Post<number, Props_Post_Content_Text> = {
		user: {
			id: 0,
			honor: 999,
			username: 'EpicGamer',
			profile: '',
			date_created: 'Today'
		},

		id: 0,
		title: 'Lol',
		comments: 0,
		votes: 0,
		content: { text: generateNChars(1000) },
		content_type: 'text',
		date_created: ''
	};

	const { getByText } = render(Post, { props: { props: data } });

	expect(getByText('Lol')).toBeTruthy();
});

test('Render a post that has a multiple images', () => {
	const data: Props_Post<number, Props_Post_Content_Image> = {
		user: {
			id: 0,
			honor: 999,
			username: 'EpicGamer',
			profile: '',
			date_created: 'Today'
		},

		id: 0,
		title: 'Lol',
		comments: 0,
		votes: 0,
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

test('Render a post that has a nice comment', () => {
	const data: Props_Post<Props_PostComment[], Props_Post_Content_Image> = {
		user: {
			id: 0,
			honor: 999,
			username: 'EpicGamer',
			profile: '',
			date_created: 'Today'
		},

		id: 0,
		title: 'Lol',
		comments: [
			{
				user: {
					id: 0,
					honor: 999,
					username: 'EpicGamer',
					profile: '',
					date_created: 'Today'
				},
				text: 'No images, fuck you',
				votes: 0,
				date_created: ''
			}
		],
		votes: 0,
		content: { images: [] },
		content_type: 'media',
		date_created: ''
	};

	const { getByText } = render(Post, { props: { props: data } });

	expect(getByText('No images, fuck you')).toBeTruthy();
});
