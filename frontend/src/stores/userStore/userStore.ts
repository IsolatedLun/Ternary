import { writable } from 'svelte/store';
import { createEmptyUserStore } from '../../utils/defaultCreates';
import type { Store_UserState } from './types';

export const userState = writable<Store_UserState>(createEmptyUserStore());
