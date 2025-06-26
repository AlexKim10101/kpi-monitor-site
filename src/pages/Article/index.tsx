import { Link, useParams } from "react-router";
import classNames from "classnames";
import { useCardBlockData, useSingleNews } from "@api/model";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Loader from "@components/Loader";
import Button from "@components/CustomButton";
import { renderBlock } from "./renderBlock";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import formatDateToDDMMYYYY from "../../utils/dateformatter";
import { prepareContent } from "../../utils/prepareArticleContent";
import IconBackLink from "@assets/icons/icon_back_link.svg";
import style from "./Article.module.css";

type ArticlePageProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const ArticlePage: React.FC<ArticlePageProps> = () => {
	const { id } = useParams();

	if (!id) return null;

	const {
		data: articleData,
		isLoading: isArticleLoading,
		error: articleError,
	} = useSingleNews(id);

	const {
		data: cardBlockData,
		isLoading: isCardBlockLoading,
		error: cardBlockError,
	} = useCardBlockData(id);

	if (isArticleLoading || isCardBlockLoading) {
		return (
			<div className="wrapper">
				<Loader />
			</div>
		);
	}

	if (articleError || cardBlockError || !articleData || !cardBlockData) {
		return <p>Ошибка загрузки данных</p>;
	}

	const article = articleData[0];
	const cardBlocks = cardBlockData[0].content;

	const content = prepareContent(article.content, cardBlocks);

	return (
		<section className={classNames("section", style.articleSection)}>
			<div className={classNames(style.breadcrumbs, "only-desctop")}>
				<Breadcrumbs>
					<Link color="inherit" to="/infocentre">
						Инфоцентр
					</Link>
					<Link color="inherit" to="/infocentre/news">
						Новости
					</Link>
					<span>{article.title}</span>
				</Breadcrumbs>
			</div>

			<Link className={style.backLink} to="/infocentre/news">
				<IconBackLink />
				Назад в пресс-центр
			</Link>

			<div className={style.article}>
				<div className={style.articleHeader}>
					<div className={style.articleDate}>
						{formatDateToDDMMYYYY(article.date)}
					</div>
					<div className={style.articleTitle}>{article.title}</div>
					<div className={style.articleDescription}>
						<Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
							{article.description}
						</Markdown>
					</div>
				</div>

				<div className={style.articleBody}>{content.map(renderBlock)}</div>
			</div>

			<div className={style.btnWrapper}>
				<Button variant="secondary" href="/infocentre/news">
					Назад в пресс-центр
				</Button>
			</div>
		</section>
	);
};

export default ArticlePage;
