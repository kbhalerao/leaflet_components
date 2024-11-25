export function createCustomDivIcon(L, props, styles) {
	const { html, ...restprops } = props;
	const {
		color = '',

		...rest
	} = styles || {};

	// Function to set SVG color dynamically
	/**
	 * @param {any} color
	 */
	function getColoredSvg(color) {
		return html.replace(/fill="currentColor"/g, `fill="${color}"`);
	}

	const customIcon = L.divIcon({
		html: color ? getColoredSvg(color) : html,
		...restprops
	});

	return customIcon;
}

export const svgIcons = {
	'noun-arrow': `<svg class="noun-arrow" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px" fill="currentColor"><title>Forward</title><path d="M67.34,15.9a3.55,3.55,0,1,0-5,5L87.85,46.44H3.53a3.56,3.56,0,0,0,0,7.11H87.85L62.3,79.06a3.62,3.62,0,0,0,0,5,3.53,3.53,0,0,0,5,0l31.6-31.6a3.47,3.47,0,0,0,0-5Z"/><text x="0" y="115" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Rainbow Designs</text><text x="0" y="120" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>`,
	'noun-barn': `<svg class="noun-barn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:serif="http://www.serif.com/" viewBox="0 0 134 167.5" version="1.1" xml:space="preserve" style="" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" fill="currentColor"><rect x="0" y="0" width="133.333" height="133.333" style="" fill="none"/><path d="M118.076,54.707l4.821,5.943c0.941,1.161 2.648,1.339 3.809,0.397c1.161,-0.942 1.339,-2.649 0.397,-3.809l-27.186,-33.518c-0.248,-0.304 -0.558,-0.552 -0.91,-0.725l-31.147,-15.286c-0.38,-0.187 -0.783,-0.276 -1.18,-0.278l-0.026,0c-0.397,0.002 -0.8,0.091 -1.181,0.278l-31.146,15.286c-0.353,0.173 -0.663,0.421 -0.91,0.725l-27.187,33.518c-0.942,1.16 -0.764,2.867 0.397,3.809c1.161,0.942 2.868,0.764 3.81,-0.397l4.82,-5.943l-0,68.486c-0,1.496 1.213,2.709 2.708,2.709l97.403,-0c1.496,-0 2.708,-1.213 2.708,-2.709l0,-68.486Zm-80.828,-27.112l-16.575,20.435c0.001,0.015 0.001,0.031 0.001,0.046c-0,0 -0,72.409 -0,72.409l17.988,0l-0,-44.432c-0,-0.468 0.118,-0.909 0.327,-1.293l0.016,-0.028c0.047,-0.084 0.099,-0.167 0.156,-0.247l0.083,-0.11l0.057,-0.07l0.041,-0.047l0.07,-0.077l0.066,-0.066c0.181,-0.177 0.381,-0.324 0.593,-0.44l0.02,-0.01c0.381,-0.205 0.816,-0.321 1.279,-0.321l50.593,0c0.463,0 0.899,0.116 1.279,0.321l0.02,0.01c0.213,0.116 0.413,0.263 0.593,0.44l0.067,0.067l0.07,0.077l0.089,0.105l0.063,0.082l0.028,0.039c0.057,0.08 0.11,0.163 0.157,0.247l0.015,0.028c0.209,0.384 0.328,0.825 0.328,1.293l-0,44.432l17.988,0l-0,-72.456l-16.575,-20.434l-29.418,-14.438l-29.419,14.438Zm11.002,92.89l36.834,0l-18.417,-17.16l-18.417,17.16Zm-4.172,-3.517l18.616,-17.345l-18.616,-17.345l0,34.69Zm26.562,-17.345l18.615,17.345l0,-34.69l-18.615,17.345Zm-22.39,-20.862l18.417,17.16l18.417,-17.16l-36.834,-0Zm30.895,-42.606c-0,-1.496 -1.213,-2.709 -2.708,-2.709l-19.54,0c-1.496,0 -2.709,1.213 -2.709,2.709l0,19.54c0,1.495 1.213,2.708 2.709,2.708l19.54,-0c1.495,-0 2.708,-1.213 2.708,-2.708l-0,-19.54Zm-5.417,2.708l0,14.123c0,0 -14.123,0 -14.123,0c0,0 0,-14.123 0,-14.123l14.123,-0Z"/><text x="0" y="149" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by rendicon</text><text x="0" y="154" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>`,
	'noun-windmill': `<svg class="noun-windmill" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 640" x="0px" y="0px" fill="currentColor"><title>Windmill</title><path d="M408.047,290.049a196.375,196.375,0,0,0-64.115-61.8L302.77,203.1a48.615,48.615,0,0,0-14.162-25.953l2.152-39.587a195.745,195.745,0,0,0-20.62-98.556L260.094,19.075a8,8,0,0,0-14.485.421l-10.4,24.015A196.456,196.456,0,0,0,219.4,131.792l2.486,44.855a48.6,48.6,0,0,0-15.047,28.537L168.148,228.2a196.477,196.477,0,0,0-64.195,61.846l-14.288,22.1a8,8,0,0,0,7.676,12.286l21.93-2.644a195.658,195.658,0,0,0,93.65-37.519l15.407-11.355L207.085,488.541a7.644,7.644,0,0,0,2.034,5.994A7.854,7.854,0,0,0,215.047,497h85.465a7.748,7.748,0,0,0,7.942-8.714L282.342,271.838l16.69,12.378a195.719,195.719,0,0,0,93.7,37.564l21.93,2.649a8,8,0,0,0,7.676-12.282Zm-153.064-45.1a32.667,32.667,0,1,1,32.667-32.667A32.7,32.7,0,0,1,254.983,244.95ZM235.377,130.915A180.364,180.364,0,0,1,249.891,49.87l3.608-8.331,2.353,4.669A179.721,179.721,0,0,1,274.783,136.7l-1.654,30.443a48.5,48.5,0,0,0-35.756-.211Zm-32,140.511A179.685,179.685,0,0,1,117.356,305.9l-4.991.6,5.025-7.771a180.39,180.39,0,0,1,58.939-56.783l31.272-18.6A48.8,48.8,0,0,0,228.379,253Zm42.387-11.362a47.2,47.2,0,0,0,19.019-.167L275.663,350H236.8l8.865-89.92ZM281.315,397H232.183l3.04-31h42.37Zm-57.441,84,6.733-68h52.638l8.244,68Zm170.77-175.1a179.72,179.72,0,0,1-86.059-34.5l-25.873-19.156a48.768,48.768,0,0,0,20-30.43l32.964,20.139a180.377,180.377,0,0,1,58.939,56.782l5.025,7.771Z"/><path d="M254.983,189.935a22.348,22.348,0,1,0,22.349,22.348A22.374,22.374,0,0,0,254.983,189.935Zm0,28.7a6.348,6.348,0,1,1,6.349-6.348A6.355,6.355,0,0,1,254.983,218.631Z"/><text x="0" y="527" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Kiran Shastry</text><text x="0" y="532" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>`,
	'noun-grain-silo': `<svg class="noun-grain-silo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:serif="http://www.serif.com/" viewBox="0 0 134 167.5" version="1.1" xml:space="preserve" style="" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" fill="currentColor"><rect x="0" y="0" width="133.333" height="133.333" style="" fill="none"/><path d="M115.242,44.622l-46.821,-38.352c-0.093,-0.08 -0.193,-0.153 -0.299,-0.221c-0.09,-0.057 -0.183,-0.109 -0.279,-0.155l-0.013,-0.007c-0.162,-0.077 -0.334,-0.139 -0.512,-0.183c-0.216,-0.054 -0.434,-0.079 -0.651,-0.079c-0.217,-0 -0.436,0.025 -0.652,0.079c-0.176,0.044 -0.346,0.105 -0.507,0.181l-0.019,0.009c-0.093,0.045 -0.184,0.096 -0.272,0.152l-0.018,0.011c-0.098,0.063 -0.192,0.132 -0.28,0.206l-47.759,38.83c-0.644,0.524 -0.985,1.284 -0.998,2.054c-0.001,0.024 -0.001,0.047 -0.001,0.07l-0,77.783c-0,1.496 1.212,2.708 2.708,2.708l95.595,0c1.496,0 2.709,-1.212 2.709,-2.708l-0,-77.783c-0,-1.225 -0.814,-2.261 -1.931,-2.595Zm-3.486,63.641l-12.664,-0l-0,14.029l12.664,-0l0,-14.029Zm-22.204,14.029l4.123,-0l-0,-14.029l-16.73,-0l-0,14.029l12.607,-0Zm-18.024,-0l-0,-14.029l-49.951,-0l0,14.029l49.951,-0Zm40.228,-33.475l-12.664,-0l-0,14.029l12.664,-0l0,-14.029Zm-40.228,14.029l-0,-14.029l-49.951,-0l0,14.029l49.951,-0Zm5.417,-14.029l-0,14.029l16.73,-0l-0,-14.029l-16.73,-0Zm34.811,-19.446l-12.664,0l-0,14.029l12.664,0l0,-14.029Zm-40.228,14.029l-0,-14.029l-49.951,0l0,14.029l49.951,0Zm5.417,-14.029l-0,14.029l16.73,0l-0,-14.029l-16.73,0Zm22.147,-19.446l-0,14.029l12.664,0l0,-14.029l-12.664,0Zm-77.515,14.029l49.951,0l-0,-14.029l-49.951,0l0,14.029Zm67.981,-14.029l-12.613,0l-0,14.029l16.73,0l-0,-14.029l-4.117,0Zm-63.092,-5.416l18.043,-0l13.565,-25.699l-31.608,25.699Zm24.168,-0l13.324,-0l0,-25.243l-13.324,25.243Zm18.741,-0l13.324,-0l-13.324,-25.243l0,25.243Zm5.943,-25.588l13.506,25.588l17.732,-0l-16.852,-13.804l-14.386,-11.784Z"/><text x="0" y="149" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by rendicon</text><text x="0" y="154" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>`
};

export const getFeatureGroupsBounds = (L, featureGroups) => {
	// Assuming featureGroupsArray is an array of FeatureGroups
	let combinedBounds = L.latLngBounds(); // Start with an empty LatLngBounds object

	if (featureGroups?.length > 1) {
		featureGroups.forEach((featureGroup) => {
			if (featureGroup && featureGroup.getBounds) {
				combinedBounds.extend(featureGroup.getBounds());
			}
		});
	} else {
		combinedBounds = featureGroups[0]?.getBounds();
	}
	return combinedBounds;
};
