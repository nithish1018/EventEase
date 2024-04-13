/* eslint-disable jsx-a11y/anchor-is-valid */

import { PlusIcon } from '@heroicons/react/solid'
import { format } from "date-fns"
import { Link } from "react-router-dom"
import React from "react";
import { useTranslation } from "react-i18next";
import MeetingCard from './MeetingCard';
const MeetingList = ({ selectedDay, selectedDayMeetings }) => {
    const { t } = useTranslation()
    return (
        <div className="meeting-list">
            <section className="mt-12 md:mt-0 md:pl-14">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-gray-900">
                        {t("Schedule")} {t("for")}{' '}
                        <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                            {format(selectedDay, 'MMM dd, yyy')}
                        </time>
                    </h2>
                    <Link to={`/new/${format(selectedDay, 'yyyy-MM-dd')}`} className="flex gap-2 items-center text-purple-600 font-semibold hover:underline underline-offset-8">
                        <PlusIcon className="w-4 h-4" />
                        {t("New")}
                    </Link>
                </div>
                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                    {selectedDayMeetings.length > 0 ? (
                        selectedDayMeetings.map((meeting) => (
                            <MeetingCard meeting={meeting} key={meeting.id} />

                        ))
                    ) : (
                        <div className="empty-list">
                            <p>{t("No")} {t("appointments")} {t("are")} {t("scheduled")}.</p>
                            <Link to={`/new/${format(selectedDay, 'yyyy-MM-dd')}`} className="text-purple-500 hover:underline">{t("Create")} {t("new")} {t("appointment")}</Link>
                        </div>
                    )}
                </ol>

            </section>
        </div>
    );
}

export default MeetingList;