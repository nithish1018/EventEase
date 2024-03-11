import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const DeleteAppointment = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { appointmentID } = useParams();
    const { user } = useAuthContext();

    const handleDelete = () => {
        if (!user) {
            setError("You must be logged in")
            return
        }
        fetch(`https://theroutine.onrender.com/api/tasks/${appointmentID}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }).then(() => {
            setIsPending(false)
            navigate("/");
        }).catch((err) => {
            console.log(err);
            setError(err);
        });
    }


    return (
        <div className="delete lg:mx-80 md:mx-40 sm:mx-20 mx-10 my-4">
            <h2 className="text-3xl font-semibold mb-4">Are you sure you want to delete this appointment?</h2>
            <p className="text-purple-900">This action cannot be undone!</p>
            {error && <div className="my-2 w-full bg-purple-200 rounded-md px-2 py-1 text-purple-900 border border-purple-900 ">{error}</div>}
            {!isPending && (
                <div className="flex gap-2">
                    <button onClick={handleDelete} className=" text-purple-800 transition-all w-full border border-purple-400 hover:bg-purple-400 bg-purple-200 hover:text-white py-3 rounded-md mt-6">Delete appointment</button>
                    <button onClick={() => { navigate("/") }} className=" hover:text-purple-800 transition-all w-full border hover:border-purple-400 bg-purple-400 hover:bg-purple-200 text-white py-3 rounded-md mt-6">Cancel</button>
                </div>
            )}
            {isPending && <button disabled className="transition-all w-full border border-purple-400 bg-purple-400 cursor-not-allowed text-white py-3 rounded-md mt-6">Deleting appointment...</button>}
        </div>
    );
}

export default DeleteAppointment;