<script>
	export let appName;

	import { categories, currentPath } from './stores';

	import Box from './components/Box';
	import SearchField from './components/SearchField';
	import CategorieResult from './components/CategorieResult';
	import { SearchResultFirstLevel, SearchResultSecondLevel } from './components/SearchResult';
</script>
	
<style>
	:global(h1, h2, h3, h4, h5) {
        text-transform: capitalize;
	}
	:global(i) {
        font-size: 10px;
	}
</style>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section class="heading">
	<Box elevation="5">
		<h1>{appName}</h1>
		<h4>/{$currentPath}</h4>
		<!-- <SearchField /> -->
	</Box>
</section>

<section class="menu">
	<Box>
		menu
	</Box>
</section>

<section class="main">
	<CategorieResult />
	<div class="search-result">
		<SearchResultFirstLevel />
		<SearchResultSecondLevel />
	</div>
</section>