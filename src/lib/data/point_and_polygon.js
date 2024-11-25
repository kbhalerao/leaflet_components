export const PointAndPolygon = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[77.0, 31.0],
						[77.1, 31.0],
						[77.1, 31.1],
						[77.0, 31.1],
						[77.0, 31.0]
					]
				]
			},
			properties: {
				name: 'Sample Polygon',
				description: 'A polygon example for the FeatureCollection.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [77.05, 31.05]
			},
			properties: {
				name: 'Sample Point',
				description: 'A point example for the FeatureCollection.'
			}
		}
	]
};
