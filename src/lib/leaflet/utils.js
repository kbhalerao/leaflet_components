import L from 'leaflet';
import { geolocationPulsatingCircle } from './stores';
import { get } from 'svelte/store';

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
