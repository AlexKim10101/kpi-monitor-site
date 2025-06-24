import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import { getImageUrl } from "../../utils/getImageUrl";
import { ArticleContentBlock } from "../../types/interfaces";
import style from "./Article.module.css";
import Icon from "@components/icon";
import Button from "@components/CustomButton";

export const renderBlock = (block: ArticleContentBlock) => {
	switch (block.__component) {
		case "shared.media": {
			return (
				<div key={block.id} className={style.media}>
					<img
						width={`${block.file.width}px`}
						height={`${block.file.height}px`}
						src={getImageUrl(block.file.url)}
						alt={block.file.name}
					/>
				</div>
			);
		}

		case "shared.subhead": {
			return (
				<div key={block.id} className={style.subhead}>
					{block.Subhead}
				</div>
			);
		}

		case "shared.rich-text": {
			return (
				<div key={block.id} className={style.richText}>
					<Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
						{block.body}
					</Markdown>
				</div>
			);
		}

		case "shared.callout": {
			// console.log(block);
			return (
				<div key={block.id} className={style.callout}>
					<div className={style.calloutHeader}>
						<div className={style.calloutIcon}>
							<Icon
								id={String(block.icon.id)}
								path={getImageUrl(block.icon.url)}
								size={18}
								// width={block.icon.width}
								// height={block.icon.height}
							/>
						</div>
						<div className={style.calloutTitle}>{block.title}</div>
					</div>
					<div className={style.calloutBody}>
						<Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
							{block.description}
						</Markdown>
					</div>
				</div>
			);
		}

		case "shared.button": {
			return (
				<div key={block.id} className={style.button}>
					{block.buttons.map(b => (
						<Button key={b.id} variant="accent" href={b.link}>
							{b.caption}
						</Button>
					))}
				</div>
			);
		}

		case "shared.card-block": {
			return (
				<div key={block.id} className={style.cardsContainer}>
					{block.card.map((c, index) => (
						<div key={index} className={style.card}>
							<div className={style.cardLogo}>
								<img
									width={c.logo.width}
									height={c.logo.height}
									src={getImageUrl(c.logo.url)}
									alt={c.logo.name}
								/>
							</div>
							<div className={style.cardDescription}>
								<Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
									{c.description}
								</Markdown>
							</div>
						</div>
					))}
				</div>
			);
		}

		default: {
			return (
				<div key={"block"}>
					<h3>неизвестный блок</h3>
				</div>
			);
		}
	}
};
