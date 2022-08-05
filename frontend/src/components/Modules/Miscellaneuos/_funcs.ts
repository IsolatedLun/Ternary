import type { Props_Community } from '../../../components/Layouts/Community/types';

export function createDefaultCommunity(): Props_Community<null, number> {
	return {
		id: -1,
		members: 0,
		posts: null,
		name: '',
		profile: '',
		banner: '',
		date_created: '',
		joined: false
	};
}
