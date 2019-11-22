export const request = async (url: string, args: RequestInit = {}) => {
	args.headers = Object.assign({}, args.headers, {
		'Content-Type': 'application/json',
		'X-CSRF-Token': document
			.querySelector('meta[name=csrf-token]')
			.getAttribute('content')
	});

	return fetch(url, args).then(res => res.json());
};
