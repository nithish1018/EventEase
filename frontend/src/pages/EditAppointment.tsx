import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext"

const EditAppointment = () => {
    const [title, setTitle] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { appointmentID } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in")
            return
        }
        const appointment = { title, id: appointmentID, userID: 1 };
        setIsPending(true);
        fetch(`https://theroutine.onrender.com/api/tasks/${appointmentID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(appointment)
        }).then(() => {
            setIsPending(false);
            navigate("/");
        })
    }

    return (
        <div className="create lg:mx-80 md:mx-40 sm:mx-20 mx-10 my-4">
            <h2 className="text-3xl font-semibold mb-4">Edit appointment</h2>
            {error && <div className="my-2 w-full bg-purple-200 rounded-md px-2 py-1 text-purple-900 border border-purple-900 ">{error}</div>}
            <form className="flex flex-col my-8" onSubmit={handleSubmit}>
                <label htmlFor="title">Enter new title: </label>
                <input value={title} onChange={(e) => { setTitle(e.target.value) }} required type="text" id="title" className="border border-black hover:border-purple-500 focus:border-purple-500 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-black " />
                {!isPending && (
                    <div className="flex gap-2">
                        <button type="submit" className=" hover:text-purple-800 transition-all w-full border border-purple-400 hover:bg-purple-200 bg-purple-400 text-white py-3 rounded-md mt-6">Edit appointment</button>
                        <button onClick={() => { navigate("/") }} className=" text-purple-800 transition-all w-full border border-purple-400 hover:bg-purple-400 bg-purple-200 hover:text-white py-3 rounded-md mt-6">Cancel</button>
                    </div>
                )}
                {isPending && <button disabled className="transition-all w-full border border-purple-400 bg-purple-400 cursor-not-allowed text-white py-3 rounded-md mt-6">Updating appointment...</button>}
            </form>
        </div>
    );
}

export default EditAppointment;