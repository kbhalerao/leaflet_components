import L from 'leaflet';
import { geolocationPulsatingCircle } from './stores';
import { get } from 'svelte/store';
import { center, circle } from '@turf/turf';

export class Control extends L.Control {
	/**
	 * @param {HTMLDivElement} el
	 * @param {any} position
	 */
	constructor(el, position) {
		super({ position });
		this.el = el;
	}
	onAdd() {
		return this.el;
	}
	onRemove() {}
}

/**
 * @param {{ latitude: any; longitude: any; accuracy: any; }} coords
 * @param {{ invalidateSize?: () => any; fitBounds?: (arg0: any) => void; setView: any; remove?: () => void; }} map
 */
export async function showLocation(coords, map, zoom) {
	let latlng = [coords.latitude, coords.longitude];

	let pulsatingCircleMarker = get(geolocationPulsatingCircle);
	if (!map?.hasLayer(pulsatingCircleMarker)) {
		const pulsatingIcon = generatePulsatingMarker(8, 'red');
		const circleMarker = L.marker(latlng, { icon: pulsatingIcon });
		circleMarker.addTo(map);

		geolocationPulsatingCircle.set(circleMarker);
	} else {
		pulsatingCircleMarker?.setLatLng(latlng);
	}
}

/**
 *
 * @param {any} radius
 * @param {any} color
 * @returns
 */
export const generatePulsatingMarker = (radius, color) => {
	const cssStyle = `
	  width: ${radius}px;
	  height: ${radius}px;
	  background: ${color};
	  color: ${color};
	  box-shadow: 0 0 0 ${color};
	`;
	return L.divIcon({
		html: `<span style="${cssStyle}" class="pulse"/>`,
		className: ''
	});
};

export const getCirclePolygon = (
	/** @type {{ layer: { toGeoJSON: () => import("@turf/helpers").AllGeoJSON; options: { radius: any; }; }; }} */ e
) => {
	let centerOfCircle = center(e.layer.toGeoJSON());
	let centerCoordinates = centerOfCircle.geometry.coordinates;
	let radius = e.layer.options.radius;
	let options = { steps: 64, units: 'meters', properties: { drawnCircle: true } };

	return circle(centerCoordinates, radius, options);
};

export function add_map_boundary_draw_controls(map, geomanControls, position) {
	map?.pm?.removeControls();
	map?.pm?.addControls({
		position: position,
		drawRectangle: false,
		drawMarker: false,
		drawPolyline: false,
		drawText: false,
		drawCircleMarker: false,
		drawCircle: false,
		...geomanControls
	});
	map?.pm?.Toolbar.changeControlOrder([
		'drawPolygon',
		'drawCircle',
		'dragMode',
		'cutPolygon',
		'removalMode',
		'rotateMode',
		'pickPolygons',
		'editMode'
	]);
}
/**
 * @param {{ addLayer: (arg0: import("leaflet").Circle<any>) => void; }} farmFeatureGroup
 * @param {{ off: (arg0: string) => void; on: (arg0: string, arg1: (e: { layer: import("leaflet").Circle<any>; shape: string; type: any; }) => void) => void; removeLayer: (arg0: import("leaflet").Circle<any>) => void; }} map
 */
export async function setUpMapForEditEvents(farmFeatureGroup, map) {
	// set drawing style here
	let L = await import('leaflet');
	if (!L.PM) {
		await import('@geoman-io/leaflet-geoman-free');
		console.debug('Reinit 1 L.PM');
		// L.PM.reInitLayer(map);
	}

	map.off('pm:create');
	map.on(
		'pm:create',

		(/** @type {{ layer: import("leaflet").Circle<any>; shape: string; type: any; }} */ e) => {
			let createdLayer = e.layer;
			console.log('Inside create');
			// on create add the newly created layer to the boundary_layer feature group.
			// Make sure this is always a Polygon feature
			if (e.shape === 'Circle') {
				// createdLayer = L.PM.Utils.circleToPolygon(e.layer);
				let circlePolygon = getCirclePolygon(e);
				createdLayer = L.geoJSON(circlePolygon);

				map.removeLayer(e.layer);
			} else if (
				e.shape === 'Polygon' ||
				e.shape === 'Rectangle' ||
				e.shape === 'Line' ||
				e.shape === 'Marker'
			) {
				createdLayer = e.layer;
			} else {
				console.warn("Don't know how to handle this shape", { e });
			}
			farmFeatureGroup.addLayer(createdLayer);
		}
	);
}
