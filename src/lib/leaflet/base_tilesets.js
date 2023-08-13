const PUBLIC_MAPBOX_API_KEY = '';

export const SQ_M_TO_ACRES = 0.000247105;
export const map_tiles = [
	{
		name: 'osm',
		representation: 'OSM',
		value: {
			uri: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			options: {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				pmIgnore: true
			}
		}
	},
	{
		name: 'google',
		representation: 'Google',
		value: {
			uri: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
			options: {
				maxZoom: 20,
				subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
				pmIgnore: true
			}
		}
	},
	{
		name: 'mapbox',
		representation: 'MapBox',
		value: {
			uri: `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${PUBLIC_MAPBOX_API_KEY}`,
			options: {
				attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox/satellite-streets-v9', // replace with your preferred Mapbox style ID
				tileSize: 512,
				zoomOffset: -1,
				accessToken: PUBLIC_MAPBOX_API_KEY,
				pmIgnore: true
			}
		}
	}
	// {
	// 	name: 'mapbox-topography',
	// 	representation: 'MapBox Topography',
	// 	value: {
	// 		uri: `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${PUBLIC_MAPBOX_API_KEY}`,
	// 		options: {
	// 			attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
	// 			maxZoom: 18,
	// 			id: 'mapbox/outdoors-v11', // replace with your preferred Mapbox style ID
	// 			tileSize: 512,
	// 			zoomOffset: -1,
	// 			accessToken: PUBLIC_MAPBOX_API_KEY,
	// 			pmIgnore: true
	// 		}
	// 	}
	// }
	// {
	// 	name: 'mapbox-satelite',
	// 	value: {
	// 		uri: `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${PUBLIC_MAPBOX_API_KEY}`,
	// 		options: {
	// 			attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
	// 			maxZoom: 18,
	// 			id: 'mapbox/satellite-streets-v11', // replace with your preferred Mapbox style , this is second id for satellite mapbox/satellite-v9
	// 			tileSize: 512,
	// 			zoomOffset: -1,
	// 			accessToken: PUBLIC_MAPBOX_API_KEY,
	// 			pmIgnore: true
	// 		}
	// 	}
	// }
];

export const markers = [
	{
		uri: '/soybean_gray.svg',
		id: 'soybean-gray'
	},
	{
		uri: '/soyben_green.svg',
		id: 'soybean-green'
	}
];

export const COLORS = ['red', 'green', 'blue'];
