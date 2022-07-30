import { act, render } from '@testing-library/svelte';
import 'jest';
import Numeric from './Numeric.svelte';

test('Render a numeric that is 158890', () => {
	const { getByText } = render(Numeric, { props: { num: 158000 } });

	expect(getByText('158.89k')).toBeTruthy();
});
