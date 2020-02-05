import { get as storeGet } from 'svelte/store';
import { 
    firstLevelSearch, 
    secondLevelSearch, 
    secondLevelEnrichedSearch, 
    categories, 
    selectedCategory, 
    selectedLabel, 
    currentPath 
} from '../../stores';
import { 
    fetchMarvelResource, 
    marvelApiDomain, 
    marvelApiPath, 
    getImagePath 
} from '../../utils'; 

export async function doSearch(item) {
    // call api
    currentPath.update(value => value = item.path);
    const payload = await fetchMarvelResource(item.path);
    const urlParts = item.path.split('/');
    // update search results
    if (urlParts.length === 1) {
        // fill first result table when category is requested and reset the second table
        firstLevelSearch.set({});
        firstLevelSearch.update(value => value = payload.data);
        secondLevelSearch.update(value => value = undefined);
        selectedCategory.update(value => value = urlParts[0]);	
    } else {
        if (urlParts[0] !== storeGet(selectedCategory)) {
            // re-fill first result table when category is changed while requesting resource
            const _payload = await fetchMarvelResource(urlParts[0]);
            firstLevelSearch.update(value => value = _payload.data);
            selectedCategory.update(value => value = urlParts[0]);
        }
        if (urlParts.length === 2) {
            // fill second result table when resource is requested
            secondLevelSearch.update(value => value = payload.data.results[0]);
            selectedLabel.update(value => value = item.label);
        }
    }   
}

export function parseFirstLevelSearch(data, title) {
    debugger
    const imageSize = 'portrait_incredible';
    const result = {
        title: '', 
        list: [],
        returned: 0, 
        available: 0,
    };

    if (!data) return result;
    
    result.title = title;
    result.list = data.results.map((item) => {
        const fields = {
            characters: 'name',
            creators: 'firstName',
            default: 'title',
        };
        const field = fields[title] || fields.default;
        const label = item[field];
        const path = item.resourceURI.replace(marvelApiDomain + marvelApiPath, '');            
        const thumbnail = getImagePath(item.thumbnail, imageSize);
        // if (thumbnail.indexOf('image_not_available') !== -1) debugger

        const resource = {
            label, 
            path,
            imageSize,
            thumbnail,
        };
        return { ...item, ...resource };
    }, []);
    result.returned = data.offset + data.count;
    result.available = data.total;

    return result;
}

export function parseSecondLevelSearch(data) {

    // if no data available, reset store and return
    if(!data) {
        secondLevelEnrichedSearch.update(value => value = []);
        return;
    }

    let currentData;
    const imageSize = 'portrait_incredible';
    const getDataInParallel = async function(path, i, j) {
		const payload = await fetchMarvelResource(path);
        // clone list
		const dataClone = JSON.parse(JSON.stringify(currentData));
        // find targeted item and add data (if available) to payload
        const target = dataClone[i] ? dataClone[i].list[j] : false;
        if (target && payload && payload.data && payload.data.count) {
            const results = payload.data.results[0];
            const images = results.images || [results.thumbnail]; // must be an array
            if (images[0]) {
                target.data = payload.data.results[0];
                target.thumbnail = getImagePath(images[0], imageSize);
                // if (target.thumbnail.indexOf('image_not_available') !== -1) debugger
                // overwrite data with enriched data from parallel load
                currentData = dataClone;
                // update to trigger render loop for parallel image rendering
                secondLevelEnrichedSearch.update(value => value = dataClone);
            }
        }
    }

    // grab every result array by category name
    return storeGet(categories).reduce((acc, category) => {
        const item = data[category.label];
        if (item && item.available) {
            const title = category.label;
            const list = item.items.map((_item, j) => {
                const label = _item.name;
                const path = _item.resourceURI.replace(marvelApiDomain + marvelApiPath, '');
                const resource = { label, path, imageSize };
                // fetch resource in parallel (as a side-effect)
                getDataInParallel(path, acc.length, j);
                // return without waiting for enriched data
                return { ..._item, ...resource };
            }, []);
            // add normalized array to accumulator
            acc.push({
                title, 
                list, 
                returned: item.returned, 
                available: item.available,
            });
            currentData = acc;
        }

        return acc;
    }, []);
}