<script>
    export let data;
    export let categories;
    export let label;
	export let doSearch;
	export let fetchResource;

	import Box from '../Box';
	import { ButtonList } from '../Lists';

	const image_size = 'landscape_xlarge';

	function parseResults(_data) {
		if(!_data) return [];
		return categories.reduce((acc, category) => {
			// grab every result array by category name
			const item = _data[category.resource.label];
			if (item && item.available) {
				const title = category.resource.label;
				const list = item.items.map((_item) => {
					const label = _item.name;
					const path = _item.resourceURI.replace('http://gateway.marvel.com/v1/public/', '');
					const resource = {
						label, 
						path,
						imageSize: image_size,
						promisedPayload: fetchResource(path).then((res)=> res.json()),
					}			
					return { ..._item, resource };
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

	$: searchResult = parseResults(data);
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
		<ButtonList data={search.list} onSubmit={doSearch} row size={image_size} />
	</Box>
	{/each}
</Box>
{/if}