<script>
	import Textfield, {Input, Textarea} from '@smui/textfield';
    import Icon from '@smui/textfield/icon/index';
	import HelperText from '@smui/textfield/helper-text/index';
	import Button, {Group, GroupItem, Label} from '@smui/button';
	import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
	import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
	import H6 from '@smui/common/H6.svelte';
	
	import { onMount } from 'svelte';
	import { categories, currentPath } from './stores';

	import Box from './components/Box';
	import { ButtonList } from './components/Lists';
	import { doSearch } from './components/SearchResult/search';
	import { fetchMarvelCategories, marvelApiPath } from './utils';
	import { SearchResultFirstLevel, SearchResultSecondLevel } from './components/SearchResult';

	export let appName;

	// search
	let searchValue = '';

	// drawer
	let myDrawer;
	let myDrawerOpen = true;
	let active = 'Gray Kittens';

	function setActive(value) {
		active = value;
		myDrawerOpen = false;
	}

	onMount(async () => {
		const payload = await fetchMarvelCategories();
		const data = payload.apis.reduce((acc, item) => {
			// set path and label
			const path = item.path.replace(marvelApiPath, '');
			const label = path.split('/')[0];
			// dedupe and add to accumulator
			if (label && acc.every(_item => _item.label.indexOf(label) < 0)) {
				acc.push({ ...item, path, label });
			}
			return acc;
		}, []);
		categories.set(data);
	});

</script>
	
<style>
	* :global(.shaped) {
		border-radius: 16px 16px 0 0;
	}
	* :global(.shaped-outlined .mdc-text-field__input) {
		padding-left: 32px;
		padding-right: 32px;
	}
	* :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__leading) {
		border-radius: 28px 0 0 28px;
		width: 28px;
	}
	* :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__trailing) {
		border-radius: 0 28px 28px 0;
	}
	* :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__notch) {
		max-width: calc(100% - 28px * 2);
	}
	* :global(.shaped-outlined + .mdc-text-field-helper-line) {
		padding-left: 32px;
		padding-right: 28px;
	}

	.drawer-container {
		position: relative;
		display: flex;
		height: 100%;
		max-width: 100%;
		border: 1px solid rgba(0,0,0,.1);
		overflow: hidden;
		z-index: 0;
	}
	* :global(.mdc-drawer--modal, .mdc-drawer-scrim) {
		/* This is not needed for a page-wide modal. */
		position: absolute;
	}
	* :global(.app-content) {
		flex: auto;
		overflow: auto;
		position: relative;
		flex-grow: 1;
	}
	.main-content {
		overflow: auto;
		padding: 16px;
		height: 100%;
		box-sizing: border-box;
	}
</style>

<svelte:head>
  <title>Home - Marvel Universe Explorer</title>
</svelte:head>

<section class="drawer-container">
	<Drawer variant="dismissible" bind:this={myDrawer} bind:open={myDrawerOpen}>
		<Header>
			<Title>{appName}</Title>
			<Subtitle>All searchable categories</Subtitle>
			<h4>/{$currentPath}</h4>
		</Header>
		
		<Content>
			<!-- <List>
			<Item href="javascript:void(0)" on:click={() => setActive('Gray Kittens')} activated={active === 'Gray Kittens'}>
				<Text>Gray Kittens</Text>
			</Item>
			<Item href="javascript:void(0)" on:click={() => setActive('A Space Rocket')} activated={active === 'A Space Rocket'}>
				<Text>A Space Rocket</Text>
			</Item>
			<Item href="javascript:void(0)" on:click={() => setActive('100 Pounds of Gravel')} activated={active === '100 Pounds of Gravel'}>
				<Text>100 Pounds of Gravel</Text>
			</Item>
			<Item href="javascript:void(0)" on:click={() => setActive('All of the Shrimp')} activated={active === 'All of the Shrimp'}>
				<Text>All of the Shrimp</Text>
			</Item>
			<Item href="javascript:void(0)" on:click={() => setActive('A Planet with a Mall')} activated={active === 'A Planet with a Mall'}>
				<Text>A Planet with a Mall</Text>
			</Item>
			</List> -->
			<ButtonList data={$categories} onSubmit={doSearch} />
		</Content>
	</Drawer>

	<AppContent class="app-content">
		<main class="main-content">
			
			<Group variant="outlined">
				<Button on:click={() => myDrawerOpen = !myDrawerOpen} variant="outlined"><Label>{myDrawerOpen ? 'Close' : 'Open'} Menu</Label></Button>
				<Button on:click={() => {}} variant="outlined"><Label>One</Label></Button>
				<Button on:click={() => {}} variant="outlined"><Label>Two</Label></Button>
				<Button on:click={() => {}} variant="outlined"><Label>Three</Label></Button>
			</Group>

			<div>
				<Textfield class="shaped-outlined" variant="outlined" withTrailingIcon bind:value={searchValue} label="Search" input$aria-controls="helper-text-search" input$aria-describedby="helper-text-search">
					<Icon class="material-icons">search</Icon>
				</Textfield>
				<HelperText id="helper-text-search">Search the Marvel database</HelperText>
			</div>

			<!-- <br /> -->
			<!-- <pre class="status">Active: {active}</pre> -->

			<SearchResultFirstLevel />
			<SearchResultSecondLevel />
		</main>
	</AppContent>
</section>
