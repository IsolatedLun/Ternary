import { writable } from 'svelte/store';
import { createEmptyUser } from '../_funcs';
import type { Store_UserState } from './types';

export const userState = writable<Store_UserState>(createEmptyUser());
