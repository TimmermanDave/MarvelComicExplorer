const basePath = 'http://localhost:3000/api';

export const marvelApiDomain = 'http://gateway.marvel.com';
export const marvelApiPath = '/v1/public/';

export function getImagePath(image, size = 'standard_large') {
	return image ? `${image.path}/${size}.${image.extension}` : '';
}

export async function fetchMarvelCategories() {
	const uri = `${basePath}/docs/v1`;
	return await fetch(uri).then(res => res.json());
}

export async function fetchMarvelResource(path) {
	const uri = `${basePath}/marvel/v1/${path}`;
	return await fetch(uri).then(res => res.json());
}