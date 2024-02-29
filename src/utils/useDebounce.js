export const useDebounce = (func, delay) => {
	let timer;
	return function (...args) {
		return new Promise((resolve) => {
			clearTimeout(timer);
			timer = setTimeout(async () => {
				const result = await func.apply(this, args);
				resolve(result);
			}, delay);
		});
	};
};
