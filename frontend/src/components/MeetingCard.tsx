/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import {
    format,
    parseISO
} from 'date-fns'
import { PencilAltIcon, TrashIcon, ClockIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom";


const MeetingCard = ({ meeting }) => {
    const adjustForUTCOffset = date => {
        return new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
        );
    };

    let startDateTime = adjustForUTCOffset(parseISO(meeting.startTime))
    let endDateTime = adjustForUTCOffset(parseISO(meeting.endTime))

    return (
        <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-200 justify-between">
            <div className="flex items-center space-x-4 group">
                <ClockIcon
                    className="flex-none w-6 h-6 "
                />
                <div className="flex-auto">
                    <p className="text-gray-900 font-semibold">{meeting.title}</p>
                    <p className="mt-0.5">
                        <time dateTime={meeting.startTime}>
                            {format(startDateTime, 'h:mm a')}
                        </time>
                        {' '}-{' '}
                        <time dateTime={meeting.endTime}>
                            {format(endDateTime, 'h:mm a')}
                        </time>
                    </p>
                </div>
            </div>
            <div className="controls md:hidden group-hover:block">
                <Link to={`/edit/${meeting.id}`} className='flex items-center gap-2 hover:text-purple-900 transition-all cursor-pointer'><PencilAltIcon className=' w-4 h-4' />Edit</Link>
                <Link to={`/delete/${meeting.id}`} className='flex items-center gap-2 hover:text-purple-900 transition-all cursor-pointer'><TrashIcon className=' w-4 h-4' />Delete</Link>
            </div>
        </li>
    )
}

export default MeetingCard