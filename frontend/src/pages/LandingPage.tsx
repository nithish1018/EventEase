import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LandingPage = () => {
    console.log("LandingPage component re-rendered");
    return (
        <Suspense fallback="loading">
            <LandingContent />
        </Suspense>
    );
}

const LandingContent = () => {

    const { t } = useTranslation()
    return (
        <div>
            <div
                className="w-full px-4 my-20 mx-auto "
            >
                <div className="flex flex-col justify-center items-center mx-auto mr-auto place-self-center ">
                    <h1
                        className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-purple-900"
                    >
                        <span className="text-6xl">{t("Easy")} & {t("Secure")} </span><br /> {t("Appointment")} {t("Scheduling")}.
                    </h1>
                    <p
                        className="text-center max-w-2xl my-6 font-light lg:mb-8 md:text-lg lg:text-xl text-black"
                    >
                        Say goodbye to the hassle of manual scheduling and streamline your daily routine with theRoutine - powerful appointment scheduling app.
                    </p>
                    <div className="flex gap-2">
                        <Link
                            to={"/signup"}
                            className="inline-flex items-center justify-center px-5 py-3 mb-2 mr-2 text-sm font-medium text-white rounded-lg w-auto focus:outline-none  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-purple-800 dark:text-white dark:border-gray-600 dark:hover:text-white hover:bg-purple-700 transition-all ease-linear"
                        >
                            Sign Up
                        </Link>
                        <Link
                            to={"/login"}
                            className="inline-flex items-center justify-center px-5 py-3 mb-2 mr-2 text-sm font-medium text-white rounded-lg w-auto focus:outline-none  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-purple-800 dark:text-white dark:border-gray-600 dark:hover:text-white hover:bg-purple-700 transition-all ease-linear"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;