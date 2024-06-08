import { useState } from "react";
type AccordionProps = {
	title: string;
	className?: string;
	children: React.ReactNode;
};
function Accordion(props: AccordionProps) {
	const { title, className, children } = props;

	const [isOpen, setIsOpen] = useState(false);
	const accordionId = `accordion-${title.replace(/\s+/g, "-").toLowerCase()}`;
	return (
		<div className={`${className}`}>
			<button
				id={accordionId}
				aria-controls={`${accordionId}-content`}
				aria-expanded={isOpen}
				className="flex flex-row justify-between items-center w-full px-2"
				onClick={() => setIsOpen(!isOpen)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setIsOpen(!isOpen);
					}
				}}
			>
				<h4>{title}</h4>
				<div>
					<svg
						className="shrink-0 ml-8"
						width="16"
						height="16"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							y="7"
							width="16"
							height="2"
							rx="1"
							className={`transform origin-center transition duration-200 ease-out ${
								isOpen && "!rotate-180"
							}`}
						/>
						<rect
							y="7"
							width="16"
							height="2"
							rx="1"
							className={`transform origin-center rotate-90 transition duration-200 ease-out ${
								isOpen && "!rotate-180"
							}`}
						/>
					</svg>
				</div>
			</button>

			<div
				id={`${accordionId}-content`}
				role="region"
				aria-labelledby={accordionId}
				className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen
						? "grid-rows-[1fr] opacity-100"
						: "grid-rows-[0fr] opacity-0"
				}`}
			>
				<div className="overflow-hidden">{children}</div>
			</div>
		</div>
	);
}

export default Accordion;
