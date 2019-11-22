<script>
	export let data;
	export let onSubmit;
    export let row;
</script>

<style>
    .list {
        display: flex;
        list-style: none;
        flex-wrap: wrap;
        padding: 0;
    }
    .row {
        flex-direction: row;
    }
    .list-item {
        margin-left: 4px;
        margin-right: 4px;
    }

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
    <li class="list-item" style:row>
        <button
            on:click={() => onSubmit(item)}
            class="ladda-button" 
            data-style="expand-right"
            data-size="s"
            data-spinner-size="10"
        >
            <span class="ladda-label">{item.label}<br /><i>/{item.path}</i></span>
        </button>
    </li>
    {/each} 
</ul>
{/if}
