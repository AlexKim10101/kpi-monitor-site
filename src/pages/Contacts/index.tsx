import ContactUsForm from "@components/Forms/contactUsForm";
import classNames from "classnames";
import style from "./Contacts.module.css";
import MapBlock from "@components/Map";

type ContactsProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const Contacts: React.FC<ContactsProps> = ({ btnCaptions, captions }) => {
	const phoneNumbers = captions.footer_phones
		? captions.footer_phones.split("\n")
		: [];
	return (
		<>
			<section className={classNames("section", style.section)}>
				<div className={style.container}>
					<div className="section-title">
						{captions.heading_footer_contacts}
					</div>
					<div className={style.content}>
						<div className={style.description}>
							Звоните, заказывайте обратный звонок или обращайтесь в чате
							поддержки — наши сотрудники будут рады ответить на ваши вопросы и
							договориться о презентации.
						</div>
						<div className={style.phone}>
							<div className={style.subtitle}>Телефоны:</div>
							<div className={style.phoneNumbers}>
								{phoneNumbers.map((pn, i) => (
									<div key={pn + "index" + i}>{pn}</div>
								))}
							</div>
						</div>
						<div className={style.email}>
							<div className={style.subtitle}>Почта:</div>
							<div className={style.emailAddress}>{captions.footer_email}</div>
						</div>
					</div>
				</div>

				<div className="container">
					<ContactUsForm />
				</div>
			</section>
			<section className={classNames("section", style.mapSection)}>
				<MapBlock />
			</section>
		</>
	);
};

export default Contacts;
