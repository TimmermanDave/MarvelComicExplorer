<script>	
	import { firstLevelSearch, currentPath, selectedCategory } from '../../stores';
	import { doSearch } from './search';
	import { marvelApiDomain, marvelApiPath, getImagePath } from '../../utils'; 

	import Box from '../Box';
	import { ButtonList } from '../Lists'; 

	let firstLevelSearchValue;
	firstLevelSearch.subscribe(value => firstLevelSearchValue = value);
	let selectedCategoryValue;
	selectedCategory.subscribe(value => selectedCategoryValue = value);

	const imageSize = 'landscape_xlarge';

	function parseResults(_data) {
		const result = {
			title: '', 
			list: [],
			returned: 0, 
			available: 0,
		};

		if (!_data) return result;

		result.title = selectedCategoryValue;
		result.list = _data.results.map((item) => {
			const fields = {
				characters: 'name',
				creators: 'firstName',
				default: 'title',
			};
			const field = fields[selectedCategoryValue] || fields.default;
			const label = item[field];
			const path = item.resourceURI.replace(marvelApiDomain + marvelApiPath, '');
			const resource = {
				label, 
				path,
				thumbnail: getImagePath(item.thumbnail, imageSize),
			};
			return { ...item, ...resource };
		}, []);
		result.returned = _data.offset + _data.count;
		result.available = _data.total;

		return result;
	}

	$: searchResult = parseResults(firstLevelSearchValue);
</script>

<style>
	
</style>

{#if searchResult.list.length}
<Box class="search-result__level--1">
	<h2>{searchResult.title}</h2>
	<i>{searchResult.returned}/{searchResult.available}</i>
	<ButtonList data={searchResult.list} onSubmit={doSearch} size={imageSize} isRow />
</Box>
{/if}