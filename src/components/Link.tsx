import { Link as RouterLink } from "react-router-dom";

type LinkProps = {
	text: string;
	to: string;
	className?: string;
};
function Link(props: LinkProps) {
	const { text, to, className } = props;
	return (
		<RouterLink
			className={`neumo neumo-out neumo-interactive ${className}`}
			to={to}
		>
			{text}
		</RouterLink>
	);
}

export default Link;
