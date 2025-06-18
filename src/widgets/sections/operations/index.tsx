import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import AccordionComponent from "@components/AccordionComponent";
import { Operation } from "@api/interfaces";
import "./operations.css";

type OperationsProps = {
	operations: Operation[];
};

const Operations: React.FC<OperationsProps> = ({ operations }) => {
	return (
		<section className="operations-section mob-padding">
			{operations.map(operation => (
				<div key={operation.id} className="operation-wrapper">
					<div className="operation-section-title">{operation.title}</div>
					<div
						id={operation.documentId}
						className="scroll-target-shift-block"
					></div>

					<div className="operation-grid">
						{operation.functions.map(item => (
							<AccordionComponent
								key={item.id}
								title={item.title}
								subtitle={item.description ? `(${item.description})` : ""}
							>
								{item.function_blocks
									.sort((a, b) => a.order - b.order)
									.map(block => (
										<div key={block.id} className="oper-block">
											{block.title && (
												<div className="oper-block-title">{block.title}</div>
											)}
											<div className="oper-block-text">
												<Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
													{block.description}
												</Markdown>
											</div>
										</div>
									))}
							</AccordionComponent>
						))}
					</div>
				</div>
			))}
		</section>
	);
};

export default React.memo(Operations);
