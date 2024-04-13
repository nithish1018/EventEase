import React from "react";
import LoadingComponent from "../components/Loading"
import useFetch from '../hooks/useFetch'
const Calender = React.lazy(() => import("../components/Calendar"));


const HomePage = () => {
    const [meetings, isPending, error] = useFetch("http://localhost:4000/api/event")

    return (
        <div className="app">
            {error && <div className="mx-20 my-2 w-full bg-purple-200 rounded-md px-2 py-1 text-purple-900 border border-purple-900 ">{error}</div>}
            {isPending && !error && <LoadingComponent />}
            {meetings &&
                <Calender meetings={meetings} />
            }
        </div>
    );
}

export default HomePage;