import './App.scss';
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		appName: 'Marvel Universe Explorer'
	}
});

export default app;