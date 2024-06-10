import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "How", href: "/how" },
	{ name: "Stocks", href: "/stocks" },
	{ name: "Predictions", href: "/predictions" },
	{ name: "Contact", href: "/contact" },
];

function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="fixed inset-x-0 top-0 z-50 neumo neumo-out-sm">
			<nav
				className="flex items-center justify-between p-6 md:px-8"
				aria-label="Global"
			>
				<div className="flex md:flex-1"></div>
				<div className="flex md:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>

						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div className="hidden md:flex md:gap-x-12">
					{navigation.map((item) => (
						<NavLink
							key={item.name}
							to={item.href}
							className="highlight-underline text-sm font-semibold leading-6 text-gray-900"
						>
							{item.name.toLocaleUpperCase()}
						</NavLink>
					))}
				</div>
				<div className="hidden md:flex md:flex-1 md:justify-end"></div>
			</nav>
			<Transition show={mobileMenuOpen} as={Fragment}>
				<Dialog
					className="md:hidden"
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
				>
					<div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="translate-x-full opacity-0"
						enterTo="translate-x-0 opacity-100"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0 opacity-100"
						leaveTo="translate-x-full opacity-0"
					>
						<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
							<div className="flex items-center justify-end">
								<button
									type="button"
									className="-m-2.5 rounded-md p-2.5 text-gray-700"
									onClick={() => setMobileMenuOpen(false)}
								>
									<span className="sr-only">Close menu</span>
									<Transition
										show={mobileMenuOpen}
										enter="transition ease-in-out duration-300 transform"
										enterFrom="opacity-0 rotate-[-180deg]"
										enterTo="opacity-100 rotate-0"
										leave="transition ease-in-out duration-300 transform"
										leaveFrom="opacity-100 rotate-0"
										leaveTo="opacity-0 rotate-[-180deg]"
									>
										<XMarkIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</Transition>
								</button>
							</div>
							<div className="mt-6 flow-root">
								<div className="-my-6 divide-y divide-gray-500/10">
									<div className="space-y-2 py-6">
										{navigation.map((item) => (
											<NavLink
												key={item.name}
												to={item.href}
												className="highlight-underline -mx-3 block rounded-md px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
												onClick={() =>
													setMobileMenuOpen(false)
												}
											>
												{item.name}
											</NavLink>
										))}
									</div>
								</div>
							</div>
						</DialogPanel>
					</Transition.Child>
				</Dialog>
			</Transition>
		</header>
	);
}

export default Navbar;
