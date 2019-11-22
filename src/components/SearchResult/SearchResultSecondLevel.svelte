<script>
    export let data;
    export let categories;
    export let label;
	export let doSearch;

	import Box from '../Box';
	import { ButtonList } from '../Lists';

	function parseResults(_data) {
		return categories.reduce((acc, cat) => {
			// grab every result array by category name
			const item = _data[cat.label];
			if (item && item.available) {
				const title = cat.label;
				const list = item.items.map((_item) => {
					const label = _item.name;
					const path = _item.resourceURI.replace('http://gateway.marvel.com/v1/public/', '');
					return { ..._item, label, path };
				}, []);
				// add normalized item array to accumulator
				acc.push({ 
					title, 
					list, 
					returned: item.returned, 
					available: item.available,
				});
			}
			return acc;
		}, []);
	}

	$: searchResult = data ? parseResults(data) : [];
</script>

<style>
	
</style>

{#if searchResult.length}
<Box class="search-result__level-2">
	<h2>{label}</h2>
	{#each searchResult as search, i}
	<Box>
		<h3>{search.title}</h3>
		<i>{search.returned}/{search.available}</i>
		<ButtonList data={search.list} onSubmit={doSearch} row />
	</Box>
	{/each}
</Box>
{/if}