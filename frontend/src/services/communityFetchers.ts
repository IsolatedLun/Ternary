import axios from 'axios';
import type { Props_Post } from 'src/components/Modules/Post/types';
import type { Props_Community, Props_CommunityUser } from '../components/Layouts/Community/types';
import {
	COMMUNITIES_URL,
	COMMUNITY_URL,
	RELEVANT_COMMUNITIES_URL,
	TOP_COMMUNITY_MEMBERS_URL
} from '../consts';
import { handleError } from './utils';

export async function getRelevantCommunities() {
	try {
		const request = await axios.get(RELEVANT_COMMUNITIES_URL);
		const res = (await request.data) as Props_Community<null, number>[];

		return res;
	} catch (e) {
		throw handleError(e);
	}
}

export async function getCommunity(id: number) {
	try {
		const request = await axios.get(COMMUNITY_URL(id));
		const res = (await request.data) as Props_Community<Props_Post<number, any>[], number>;

		return res;
	} catch (e) {
		throw handleError(e);
	}
}

export async function getTopMembers(id: number) {
	try {
		const request = await axios.get(TOP_COMMUNITY_MEMBERS_URL(id));
		const res = (await request.data) as Props_CommunityUser[];

		return res;
	} catch (e) {
		throw handleError(e);
	}
}
