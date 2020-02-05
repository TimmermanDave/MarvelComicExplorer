<script>
	import { onMount } from 'svelte';
	import { categories } from '../../stores';
	import { doSearch } from '../SearchResult/search';
	import { fetchMarvelCategories, marvelApiPath } from '../../utils';

	import Box from '../Box';
	import { ButtonList } from '../Lists';

	onMount(async () => {
		const payload = await fetchMarvelCategories();
		// categories.set(
		// 	payload.apis.reduce((acc, item) => {
		// 		// set path and label
		// 		const path = item.path.replace(marvelApiPath, '');
		// 		const label = path.split('/')[0];
		// 		// dedupe and add to accumulator
		// 		if (label && acc.every(_item => _item.label.indexOf(label) < 0)) {
		// 			acc.push({ ...item, path, label });
		// 		}
		// 		return acc;
		// 	}, []);
		// );
	});
</script>
	
<style>
	/* styles */
</style>

<Box>
	<h2>Categories</h2>
	<ButtonList data={$categories} onSubmit={doSearch} />
</Box>
