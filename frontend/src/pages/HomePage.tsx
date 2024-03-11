
import React from "react"
import Calender from "../components/Calendar"
import LoadingComponent from "../components/Loading"
import useFetch from '../hooks/useFetch'


const HomePage = () => {
    const [meetings, isPending, error] = useFetch("http://localhost:8080/api/tasks")

    return (
        <div className="app">
            {error && <div className="mx-20 my-2 w-full bg-purple-200 rounded-md px-2 py-1 text-purple-900 border border-purple-900 ">{error}</div>}
            {isPending && !error && <LoadingComponent />}
            {meetings && <Calender meetings={meetings} />}
        </div>
    );
}

export default HomePage;