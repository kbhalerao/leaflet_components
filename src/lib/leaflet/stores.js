import { writable } from 'svelte/store';

export const geolocationPulsatingCircle = writable({}); // Leaflet layer pulsating circle
export let tileLayers = writable({});
