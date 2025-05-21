import React from "react";
import "./clients.css";
import Icon from "../../../components/icon";
import { BASE_URL } from "../../../consts/consts";
import CardGallery from "../../../components/Slider";
import { useClients } from "../../../api/model";

type IClientsSectionProps = { captions: Record<string, string> };

const ClientsSection: React.FC<IClientsSectionProps> = ({ captions }) => {
	const { data, isLoading, error } = useClients();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	// console.log("ClientsSection", data);

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	return (
		<section className="clients-section">
			<div className="section-title">{captions.heading_clients}</div>
			<CardGallery
				desctopSlidesToShow={6}
				laptopSlidesToShow={6}
				mobileSlidesToShow={6}
			>
				{data.map((item, index, arr) => {
					const shift = Math.ceil(arr.length / 2);

					const shiftItemIndex =
						index + shift > arr.length - 1 ? index - shift : index + shift;

					const shiftItem = arr[shiftItemIndex];

					return (
						<div>
							<div className="client-card">
								<Icon
									id={String(item.id)}
									path={BASE_URL + item.logo.url}
									width={item.logo.width}
									height={item.logo.height}
								/>
								<Icon
									id={String(shiftItem.id)}
									path={BASE_URL + shiftItem.logo.url}
									width={shiftItem.logo.width}
									height={shiftItem.logo.height}
								/>
							</div>
						</div>
					);
				})}
			</CardGallery>
		</section>
	);
};

export default ClientsSection;
