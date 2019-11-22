<script>
	export let categories;
	export let doSearch;

	import { onMount } from 'svelte';
	import Box from '../Box';
	import { ButtonList } from '../Lists';
</script>
	
<style>
	
</style>

<Box>
	<h2>Categories</h2>
	<ButtonList data={categories} onSubmit={doSearch} row />
</Box>
