import { propOrDefault } from './componentFuncs';

export function rand(max: number): number {
	return Math.ceil(Math.random() * max);
}

/**
 * @param obj
 * @returns Converts { obj } to a valid formData
 */
export function constructFormData(obj: object): FormData | null {
	if (obj instanceof Object) {
		let formData = new FormData();

		Object.entries(obj).forEach((tup) => {
			console.log(tup);
			formData.append(tup[0], tup[1]);
		});

		return formData;
	}

	return null;
}

/**
 * @returns Whether or not screen size is small
 */
export function isOnMobile() {
	const screen = { x: window.screen.width, y: window.screen.height };

	return screen.x < 768;
}

/**
 * @param e
 * @param whitelist - Ignores element with same className
 */
export function toggleDropdowns<T extends Event>(e: T, whitelist: string) {
	e.stopPropagation();

	const target = e.target as HTMLElement;
	const dropdowns = document.querySelectorAll('*[data-dropdown-state]');

	// The id of the possibly clicked dropdown
	const ignoreId = propOrDefault(target.closest('.dropdown__items')?.id, 'NaE');

	if (!target.classList.contains(whitelist)) {
		dropdowns.forEach((el) => {
			// If the element is not the clicked dropdown
			if (el.id === ignoreId) el.setAttribute('data-dropdown-state', 'true');
			else el.setAttribute('data-dropdown-state', 'false');
		});
	}
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
