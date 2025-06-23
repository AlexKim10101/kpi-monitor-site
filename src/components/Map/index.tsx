import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapBlock = () => {
	const coordinates = [55.753848, 37.698861];

	return (
		<div style={{ width: "100%", height: "400px" }}>
			<YMaps>
				<Map
					defaultState={{ center: coordinates, zoom: 15 }}
					width="100%"
					height="100%"
				>
					<Placemark
						geometry={coordinates}
						options={{
							iconLayout: "default#image",
							iconImageHref: "/icons/pin.svg",
							hasHint: true,
							iconImageSize: [40, 40],
							iconImageOffset: [-20, -20],
							iconContentOffset: [0, 40],
						}}
					/>
				</Map>
			</YMaps>
		</div>
	);
};

export default MapBlock;
