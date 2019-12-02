<script>
	export let data;
	export let onSubmit;
    export let isRow;
    export let size = 'standard_large';
</script>

<style>
    .list {
        display: flex;
        list-style: none;
        flex-wrap: wrap;
        padding: 0;
    }
    .isRow {
        /* flex-direction: row; */
    }
    .list-item {
        margin: 4px;
        background-image: var(--bg);
        background-size: cover;
    }
    button {
        width: 100%;
        height: 100%;
        color: grey;
    }
    .ladda-button {
        background-color: transparent;
    }

    /* Image api sizes: */
	.portrait_small { min-width: 50px; height: 75px }
	.portrait_medium { min-width: 100px; height: 150px }
	.portrait_xlarge { min-width: 150px; height: 225px }
	.portrait_fantastic { min-width: 168px; height: 252px }
	.portrait_uncanny { min-width: 300px; height: 450px }
	.portrait_incredible { min-width: 216px; height: 324px }
	.standard_small	{ min-width: 65px; height: 45px }
	.standard_medium { min-width: 100px; height: 100px }
	.standard_large	{ min-width: 140px; height: 140px }
	.standard_xlarge { min-width: 200px; height: 200px }
	.standard_fantastic	{ min-width: 250px; height: 250px }
	.standard_amazing { min-width: 180px; height: 180px }
	.landscape_small { min-width: 120px; height: 90px }
	.landscape_medium { min-width: 175px; height: 130px }
	.landscape_large { min-width: 190px; height: 140px }
	.landscape_xlarge { min-width: 270px; height: 200px }
	.landscape_amazing { min-width: 250px; height: 156px }
	.landscape_incredible { min-width: 464px; height: 261px }
	.detail	{} /* constrained to 500px wide */
	.full-size {} /* no variant descriptor */

    /*
    Ladda styles:
    data-style: one of the button styles, full list in demo [required]
    data-color: green/red/blue/purple/mint
    data-size: xs/s/l/xl, defaults to medium
    data-spinner-size: pixel dimensions of spinner, defaults to dynamic size based on the button height
    data-spinner-color: a hex code or any named CSS color
    data-spinner-lines: the number of lines the for the spinner, defaults to 12
    */
</style>

{#if data && data.length}
<ul class="list">
    {#each data as item, i}
    <li 
        class="list-item {size}" 
        style:isRow 
        style="--bg: url({item.thumbnail});"
    >
        <button
            on:click={() => onSubmit(item)}
            class="ladda-button" 
            data-style="expand-right"
            data-size="s"
            data-spinner-size="10"
        >
            <span class="ladda-label">
                {item.label}<br />
                <i>/{item.path}</i>
            </span>
        </button>
    </li>
    {/each}
</ul>
{/if}
