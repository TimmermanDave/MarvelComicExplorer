<script>
    export let data;
    export let category;
	export let doSearch;

	import Box from '../Box';
	import { ButtonList } from '../Lists';

	const item = { 
		title: '', 
		list: [],
		returned: 0, 
		available: 0,
	};

	function parseResults(_data) {
		if (!_data) return item;
		item.title = category;
		item.list = _data.results.map((_item) => {
			const fields = {
				characters: 'name',
				creators: 'firstName',
				default: 'title',
			};
			const field = fields[category] || fields.default;
			const label = _item[field];
			const path = _item.resourceURI.replace('http://gateway.marvel.com/v1/public/', '');
			return { ..._item, label, path };
		}, []);
		item.returned = _data.offset + _data.count; 
		item.available = _data.total;
		return item;
	}
	
	$: searchResult = parseResults(data);
</script>

<style>
	
</style>

{#if searchResult.list.length}
<Box class="search-result__level-1">
	<h2>{searchResult.title}</h2>
	<i>{searchResult.returned}/{searchResult.available}</i>
	<ButtonList data={searchResult.list} onSubmit={doSearch} row />
</Box>
{/if}