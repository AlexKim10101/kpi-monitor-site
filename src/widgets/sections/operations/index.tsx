import React from "react";
import { useOperations } from "../../../api/model";
import "./operations.css";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type OperationsProps = {};

const Operations: React.FC<OperationsProps> = () => {
	const { data, isLoading, error } = useOperations();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	console.log("Operations", data);

	return (
		<section className="operations-section">
			<div className="operation-wrapper">
				<div className="operation-section-title">Операторы</div>
				<div className="operation-grid">
					{data.map(item => (
						<Accordion key={item.id}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1-content"
								id="panel1-header"
							>
								<div className="operation-title">{item.title}</div>
							</AccordionSummary>
							<AccordionDetails>
								<div className="operation-content">
									{item.function_blocks
										.sort((a, b) => a.order - b.order)
										.map(block => (
											<div className="oper-block">
												<div className="oper-block-title">{block.title}</div>
												<div className="oper-block-text">
													{block.description}
												</div>
											</div>
										))}
								</div>
							</AccordionDetails>
						</Accordion>
					))}

					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1-content"
							id="panel1-header"
						>
							Expanded by default
						</AccordionSummary>
						<AccordionDetails>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
							eget.
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2-content"
							id="panel2-header"
						>
							<Typography component="span">Header</Typography>
						</AccordionSummary>
						<AccordionDetails>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
							eget.
						</AccordionDetails>
					</Accordion>
				</div>
			</div>
		</section>
	);
};

export default Operations;
