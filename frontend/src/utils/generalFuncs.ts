export function rand(max: number): number {
	return Math.ceil(Math.random() * max);
}

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

export function isOnMobile() {
	const screen = { x: window.screen.width, y: window.screen.height };

	return screen.x < 768;
}
