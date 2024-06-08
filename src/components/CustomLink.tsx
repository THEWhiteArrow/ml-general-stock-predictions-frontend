import { Link as RouterLink } from "react-router-dom";

type LinkProps = {
	text: string;
	to: string;
	className?: string;
	c2a?: boolean;
};
function CustomLink(props: LinkProps) {
	const { text, to, className, c2a } = props;
	return (
		<RouterLink
			className={`neumo neumo-out neumo-interactive ${className}`}
			to={to}
		>
			{c2a ? text.toLocaleUpperCase() : text}
		</RouterLink>
	);
}

export default CustomLink;
