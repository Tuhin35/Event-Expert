import { useState } from "react";

const Item = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b dark:border-slate-400">
            <button
                type="button"
                aria-label="Open item"
                title="Open item"
                className="flex items-center justify-between w-full p-4 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="text-lg font-medium dark:text-white-toned">{title}</p>
                <svg
                    viewBox="0 0 24 24"
                    className={`w-3 text-gray-600  ${isOpen ? 'rotate-180' : ''
                        }`}
                >
                    <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        points="2,7 12,17 22,7"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="p-4 pt-0">
                    <p className="text-gray-700 dark:text-white-toned">{children}</p>
                </div>
            )}
        </div>
    );
};

export const Faq = () => {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
            <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">

                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto dark:text-snow-white">
                        <span className="relative inline-block dark:text-snow-white-toned">
                            <svg
                                viewBox="0 0 52 24"
                                fill="currentColor"
                                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-slate-800 dark:text-snow-white lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                            >
                                <defs>
                                    <pattern
                                        id="232db96b-4aa2-422f-9086-5a77996d1df1"
                                        x="0"
                                        y="0"
                                        width=".135"
                                        height=".30"
                                    >
                                        <circle cx="1" cy="1" r=".7" />
                                    </pattern>
                                </defs>
                                <rect
                                    fill="url(#232db96b-4aa2-422f-9086-5a77996d1df1)"
                                    width="52"
                                    height="24"
                                />
                            </svg>
                            <span className="relative">Some</span>
                        </span>{' '}
                        frequently asked questions
                    </h2>
                    <p className="text-base text-gray-700 md:text-lg dark:text-snow-white-toned">
                        This is new text just added
                    </p>
                </div>
                <div className="space-y-4">
                    <Item title="What services does your website offer?">
                        Our website offers a one-stop-shop solution for event planning, including event costumes, photographers, event venues, and food.
                    </Item>
                    <Item title="Who can register on your website?">
                        Any business owner providing event-related services such as venue owners, photographers, and clothing brands can register on our website to offer their services
                    </Item>
                    <Item title="Can I book multiple services for my event through your website?">
                        Yes, you can book multiple services for your event through our website by clicking on the "Add to cart" button for each service you want to book.
                    </Item>
                    <Item title="How do I pay for the services I book through your website?">
                        You can pay for the services through our secure payment gateway using your credit card or other online payment methods.
                    </Item>
                </div>
            </div>
        </div>
    );
};