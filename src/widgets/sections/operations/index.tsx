import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useOperations } from "../../../api/model";
import "./operations.css";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionComponent from "@components/AccordionComponent";

type OperationsProps = {};

const Operations: React.FC<OperationsProps> = () => {
	const { data, isLoading, error } = useOperations();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	return (
		<section className="operations-section">
			{data.map(operation => (
				<div key={operation.id} className="operation-wrapper">
					<div className="operation-section-title">{operation.title}</div>
					<div className="operation-grid">
						{operation.functions.map(item => (
							<AccordionComponent
								key={item.id}
								title={`${item.title} (${item.description})`}
							>
								{item.function_blocks
									.sort((a, b) => a.order - b.order)
									.map(block => (
										<div key={block.id} className="oper-block">
											{block.title && (
												<div className="oper-block-title">{block.title}</div>
											)}
											<div className="oper-block-text">
												<Markdown remarkPlugins={[remarkGfm]}>
													{block.description}
												</Markdown>
											</div>
										</div>
									))}
							</AccordionComponent>
						))}

						{/* {operation.functions.map(item => (
							<Accordion key={item.id}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<div className="operation-title">
										{item.title} ({item.description})
									</div>
								</AccordionSummary>
								<AccordionDetails>
									<div className="operation-content">
										{item.function_blocks
											.sort((a, b) => a.order - b.order)
											.map(block => (
												<div key={block.id} className="oper-block">
													<div className="oper-block-title">{block.title}</div>
													<div className="oper-block-text">
														<Markdown remarkPlugins={[remarkGfm]}>
															{block.description}
														</Markdown>
													</div>
												</div>
											))}
									</div>
								</AccordionDetails>
							</Accordion>
						))} */}
					</div>
				</div>
			))}
		</section>
	);
};

export default Operations;
