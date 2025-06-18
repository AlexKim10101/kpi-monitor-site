import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import throttle from "lodash.throttle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Operation } from "../../api/interfaces";
import { SCROLL_LIMIT } from "../../consts/consts";
import NextIcon from "@assets/icons/ic_next.svg";
import { chunkArray, findChunkIndexById } from "../../utils/chunkArrUtils";
import "./floating-tabs.css";

type FloatingTabsProps = {
	operations: Operation[];
	activeTab: string;
	setActiveTab: (id: string) => void;
};

const FloatingTabs: React.FC<FloatingTabsProps> = ({
	operations,
	activeTab,
	setActiveTab,
}) => {
	const [up, setUp] = useState(true);
	const [slise, setSlice] = useState(0);
	const activeObserverRef = useRef(true);

	const chunks = chunkArray(operations, 5);

	const scrollToTarget = (id: string) => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
		setActiveTab(newValue);
		activeObserverRef.current = false;
		scrollToTarget(newValue);
		setTimeout(() => {
			activeObserverRef.current = true;
		}, 600);
	};

	useEffect(() => {
		const latestOperations = operations;
		const throttledHandler = throttle((id: string) => {
			setActiveTab(id);
			setSlice(findChunkIndexById(latestOperations, 5, id));
		}, 700);

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					const id = entry.target.getAttribute("id");
					if (entry.isIntersecting && id) {
						activeObserverRef.current && throttledHandler(id);
					}
				});
			},
			{
				rootMargin: "0px 0px -90% 0px",
				threshold: 0.1,
			}
		);

		operations.forEach(tab => {
			const el = document.getElementById(tab.documentId);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [operations]);

	useEffect(() => {
		setSlice(findChunkIndexById(operations, 5, activeTab));
	}, [activeTab]);

	useEffect(() => {
		const handleScroll = () => {
			const distanceFromBottom =
				document.documentElement.scrollHeight -
				window.scrollY -
				window.innerHeight;

			setUp(distanceFromBottom < SCROLL_LIMIT || !(window.scrollY > 300));
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<div
				className={classNames("floating-tabs-wrapper", "only-mob-flex", {
					"floating-tabs-wrapper-down": true,
				})}
			>
				<div className="floating-tabs-container">
					<div className="floating-tabs">
						<Tabs
							value={
								Boolean(operations.find(item => item.documentId === activeTab))
									? activeTab
									: false
							}
							onChange={handleChange}
							variant="scrollable"
							sx={{
								"&.MuiTabs-root": {
									flexGrow: 4,
									minHeight: 0,
									display: "flex",
								},

								"& .MuiTabs-list": {
									gap: "10px",
								},

								"& .MuiTabs-list.MuiTab-root": {},

								"& .MuiTabs-indicator": {
									height: "1px",
									backgroundColor: "var(--primary-color)",
									bottom: "5px",
								},

								"& .MuiTab-root": {
									color: "var(--primary-color)",
									fontFamily: "Manrope",
									fontSize: "14px",
									fontStyle: "normal",
									fontWeight: "400",
									lineHeight: "normal",
									display: "flex",
									minHeight: 0,
									padding: "0px 5px 5px 5px",
									textTransform: "none",

									"&.Mui-selected": {
										color: "var(--primary-color)",
									},
								},

								"& .MuiButtonBase-root.MuiTab-root": {
									maxWidth: "100%",
								},
							}}
						>
							{operations.map((operation, index) => {
								return (
									<Tab
										key={operation.id}
										className="floating-tab-item"
										value={operation.documentId}
										label={operation.point}
										disableRipple
									/>
								);
							})}
						</Tabs>
					</div>
				</div>
			</div>
			<div
				className={classNames("floating-tabs-wrapper", "only-desc-flex", {
					"floating-tabs-wrapper-down": !up,
				})}
			>
				<div className="floating-tabs-container">
					<div className="floating-tabs">
						{chunks.map((chunk, index) => (
							<Tabs
								key={chunk[0].documentId + index}
								value={
									Boolean(chunk.find(item => item.documentId === activeTab))
										? activeTab
										: false
								}
								onChange={handleChange}
								sx={{
									"&.MuiTabs-root": {
										flexGrow: 4,
										minHeight: 0,
										display: index === slise ? "flex" : "none",
									},

									"& .MuiTabs-list": {
										justifyContent: "space-between",
									},

									"& .MuiTabs-list.MuiTab-root": {},

									"& .MuiTabs-indicator": {
										height: "1px",
										backgroundColor: "var(--primary-color)",
									},

									"& .MuiTab-root": {
										color: "var(--primary-color)",
										fontFamily: "Manrope",
										fontSize: "16px",
										fontStyle: "normal",
										fontWeight: "400",
										lineHeight: "normal",
										display: "flex",
										minHeight: 0,
										padding: "0px 5px 5px 5px",
										textTransform: "none",

										"&.Mui-selected": {
											color: "var(--primary-color)",
										},
									},

									"& .MuiButtonBase-root.MuiTab-root": {
										maxWidth: "100%",
									},
								}}
							>
								{chunk.map((operation, index) => {
									return (
										<Tab
											key={operation.id}
											className="floating-tab-item"
											value={operation.documentId}
											label={operation.point}
											disableRipple
										/>
									);
								})}
							</Tabs>
						))}
						<div className="next-btr-wrapper">
							<button
								className="next-btn"
								onClick={() =>
									setSlice(prev => {
										return operations.length > (prev + 1) * 5 ? prev + 1 : 0;
									})
								}
							>
								<NextIcon />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FloatingTabs;
