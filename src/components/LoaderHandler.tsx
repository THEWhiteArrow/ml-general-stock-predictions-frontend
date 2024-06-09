type LoaderHandlerProps = {
	disableLessBtn: boolean;
	disableMoreBtn: boolean;
	handleLess: () => void;
	handleMore: () => void;
};

function LoaderHandler(props: LoaderHandlerProps) {
	const { disableLessBtn, disableMoreBtn, handleLess, handleMore } = props;
	return (
		<div className="flex flex-col md:flex-row gap-4 justify-center items-center my-2">
			<button
				className="neumo-out neumo-interactive p-4 w-full md:w-64 disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={disableLessBtn}
				onClick={handleLess}
			>
				Load less
			</button>
			<button
				className="neumo-out neumo-interactive p-4 w-full md:w-64 disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={disableMoreBtn}
				onClick={handleMore}
			>
				Load more
			</button>
		</div>
	);
}

export default LoaderHandler;
