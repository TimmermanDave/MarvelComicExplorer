<script>
    export let data;
    export let category;
	export let doSearch;

	import Box from '../Box';
	import { ButtonList } from '../Lists';

	const result = { 
		title: '', 
		list: [],
		returned: 0, 
		available: 0,
	};

	const image_size = 'landscape_xlarge';

	function parseResults(_data) {
		if (!_data) return result;
		result.title = category;
		result.list = _data.results.map((item) => {
			const fields = {
				characters: 'name',
				creators: 'firstName',
				default: 'title',
			};
			const field = fields[category] || fields.default;
			const label = item[field];
			const path = item.resourceURI.replace('http://gateway.marvel.com/v1/public/', '');
			const resource = { 
				label, 
				path,
				thumbnail:`${item.thumbnail.path}/${image_size}.${item.thumbnail.extension}`,
			};
			return { ...item, resource };
		}, []);
		result.returned = _data.offset + _data.count; 
		result.available = _data.total;
				
		return result;
	}
	
	$: searchResult = parseResults(data);
</script>

<style>
	
</style>

{#if searchResult.list.length}
<Box class="search-result__level-1">
	<h2>{searchResult.title}</h2>
	<i>{searchResult.returned}/{searchResult.available}</i>
	<ButtonList data={searchResult.list} onSubmit={doSearch} row size={image_size} />
</Box>
{/if}