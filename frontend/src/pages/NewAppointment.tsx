import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext"

const NewAppointment = () => {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [override, setOverride] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { selectedDay } = useParams();

    const handleOverride = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/tasks/${error.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }).then(() => {
            const startDTime = selectedDay + "T" + startTime + ":00.000Z"
            const endDTime = selectedDay + "T" + endTime + ":00.000Z"
            const appointment = { title, startTime: startDTime, endTime: endDTime, userID: 1 };
            setIsPending(true);
            fetch("http://localhost:8080/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`

                },
                body: JSON.stringify(appointment)
            }).then(async (res) => {
                const result = await res.json()
                setIsPending(false);
                if (result.occupied === false) {
                    navigate("/");
                } else {
                    if (result.occupied && result.occupiedBy) {
                        setOverride(true)
                        setError(result.occupiedByName)
                    } else {
                        setOverride(false)
                        setError("The start and end time cannot be same")
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const startDTime = selectedDay + "T" + startTime + ":00.000Z"
        const endDTime = selectedDay + "T" + endTime + ":00.000Z"
        const appointment = { title, startTime: startDTime, endTime: endDTime, userID: 1 };
        setIsPending(true);
        fetch("http://localhost:8080/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`

            },
            body: JSON.stringify(appointment)
        }).then(async (res) => {
            const result = await res.json()
            setIsPending(false);
            if (result.occupied === false) {
                navigate("/");
            } else {
                if (result.occupied && result.occupiedBy) {
                    setOverride(true)
                    setError(result.occupiedByName)
                } else {
                    setOverride(false)
                    setError("The start time cannot be same or greater than end time")
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="create lg:mx-80 md:mx-40 sm:mx-20 mx-10 my-4">
            <h2 className="text-3xl font-semibold mb-4">Create new appointment for {selectedDay}</h2>
            {error && !override && <div className="my-2 w-full bg-purple-200 rounded-md px-2 py-1 text-purple-900 border border-purple-900 ">{error}</div>}
            {error && override && <div className="my-2 w-full bg-purple-200 rounded-md px-2 py-1 text-purple-900 border border-purple-900 ">The slot is already occupied by "{error.title}" <br /> from {new Date(error.startTime).toUTCString()} to {new Date(error.endTime).toUTCString()}</div>}
            {error && override && <div className="my-2 w-full bg-purple-200 rounded-md px-2 py-1 text-purple-900 border border-purple-900 ">Do you want to override the Appointment?</div>}
            <form className="flex flex-col my-8" onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input value={title} onChange={(e) => { setTitle(e.target.value) }} required type="text" id="title" className="border border-black hover:border-purple-500 focus:border-purple-500 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-black " />
                <label htmlFor="startTime">Start Time: </label>
                <input value={startTime} onChange={(e) => { setStartTime(e.target.value) }} required type="time" id="startTime" className="border border-black hover:border-purple-500 focus:border-purple-500 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-black " />
                <label htmlFor="endTime">End Time: </label>
                <input value={endTime} onChange={(e) => { setEndTime(e.target.value) }} required type="time" id="endTime" className="border border-black hover:border-purple-500 focus:border-purple-500 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-black " />
                {!isPending && !override && <button className=" text-purple-800 transition-all w-full border border-purple-400 hover:bg-purple-400 hover:text-white py-3 rounded-md mt-6">Add appointment</button>}
                {override && <button onClick={handleOverride} className=" text-purple-800 transition-all w-full border border-purple-400 hover:bg-purple-400 hover:text-white py-3 rounded-md mt-6">Override appointment</button>}
                {isPending && <button disabled className="transition-all w-full border border-purple-400 bg-purple-400 cursor-not-allowed text-white py-3 rounded-md mt-6">Adding appointment...</button>}
            </form>
        </div>
    );
}

export default NewAppointment;