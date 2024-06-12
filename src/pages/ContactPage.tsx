import { ReactComponent as LinkedinSvg } from "../assets/svgs/linkedin.svg";
import { ReactComponent as GithubSvg } from "../assets/svgs/github.svg";
import { ReactComponent as GoogleSvg } from "../assets/svgs/google.svg";
import { ReactComponent as ContactSvg } from "../assets/svgs/undraw_message_sent_re_q2kl.svg";
import { Helmet } from "react-helmet";

function ContactPage() {
	return (
		<>
			<Helmet>
				<title>Contact | GSP</title>
				<meta
					name="description"
					content="Contact the developer of the General Stock Predictions platform."
				/>
			</Helmet>
			<section className="flex flex-col flex-grow items-center justify-center">
				<h1 className="relative text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
					Contact me
					<ContactSvg className="absolute hidden md:block w-20 h-20 -right-32 -top-8 opacity-60" />
				</h1>
				<p className="mt-6 text-center">
					Hey, my name is Damian and I single-handedly developed this
					platform.
				</p>
				<p className="text-center">Let me know what you think.</p>

				<div className="mt-6">
					<p className="text-center">You can hit me up below.</p>
					<div className="my-4 flex flex-row justify-evenly items-center gap-6">
						<a
							aria-label="LinkedIn"
							href="https://www.linkedin.com/in/damian-trafialek/"
							target="_blank"
							className="neumo p-4 neumo-out neumo-interactive"
							rel="noopener noreferrer"
						>
							<LinkedinSvg className="w-8 h-8 mx-2" />
						</a>
						<a
							aria-label="Email"
							href="mailto:damian.trafialek@gmail.com"
							// target="_blank"
							className="neumo p-4 neumo-out neumo-interactive"
						>
							<GoogleSvg className="w-8 h-8 mx-2" />
						</a>
						<a
							aria-label="GitHub"
							href="https://github.com/THEWhiteArrow"
							target="_blank"
							className="neumo p-4 neumo-out neumo-interactive"
							rel="noopener noreferrer"
						>
							<GithubSvg className="w-8 h-8 mx-2" />
						</a>
					</div>
					<p className="text-center">Hear from you soon!</p>
				</div>
			</section>
		</>
	);
}

export default ContactPage;
