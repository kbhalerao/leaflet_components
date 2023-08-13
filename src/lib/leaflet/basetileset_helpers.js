import { map_tiles } from './base_tilesets.js';

export async function add_google_baselayer() {
	// returns a leaflet layer that can must be added to a map
	let L = await import('leaflet');
	await import(
		'https://unpkg.com/leaflet.gridlayer.googlemutant@latest/dist/Leaflet.GoogleMutant.js'
	);
	return L.gridLayer.googleMutant({
		type: 'hybrid', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
		pmIgnore: true,
		styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }]
	});
}

export async function add_basetilelayers(baseTileLayers, map, baseTileLayer = 'osm') {
	// Helper function to create basemap layers. The layer names are
	// stored in the baseTileLayers, and returned. These map layers are  added
	// to the map;  the baseTileLayer is moved to the front.
	let L = await import('leaflet');
	map_tiles.forEach(async function (obj) {
		if (obj.name === 'google') {
			baseTileLayers.google = await add_google_baselayer();
			// map.addLayer(baseTileLayers.google);
		} else {
			baseTileLayers[obj.name] = L.tileLayer(obj.value.uri, obj.value.options);
			// map.addLayer(baseTileLayers[obj.name]);
		}
	});
	baseTileLayers[baseTileLayer].addTo(map);
}

export async function change_basetilelayer(baseTileLayers, map, baseTileLayer) {
	let lyr = baseTileLayers[baseTileLayer];
	lyr ? (map.hasLayer(lyr) ? lyr.bringToFront() : lyr.addTo(map)) : null;
	// baseTileLayers[baseTileLayer].redraw();
}
