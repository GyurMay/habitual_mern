import { useState } from "react";
import { useParams } from "react-router-dom";

export default function HabitFormPage(props){
  const {makeHabit} = useParams();
  const [mh, setMh] = useState(makeHabit);
  const [bh, setBh] = useState("");
    // useState
  const [fdd, setFdd] = useState("");
    
  const handleChange = (event) => {
    setBh(document.querySelector("#fbh").value);
    setMh(document.querySelector("#fmh").value);
    setFdd(document.querySelector("#fdd").value);
  }
function handleSubmit(event){
    event.preventDefault();
    let currLatestId = 103;
    //make request to DB/backend and refresh
    // makeDbRequest(mh, bh, fdd, parseInt(currLatestId));
    //document.location.href = `http://${document.location.host}`;
}

    return (
        <>
        <div id="main">
            <div id="container" className="text-center">
                <div id="createForm">
                    <h1><strong>Create a New Habit</strong></h1><br />
                    <h3>Make Habit: <input id="fmh" name="makeHabit" value={mh} onChange={handleChange}></input></h3>
                    <h3>Break Habit: <input id="fbh" name="breakHabit" onChange={handleChange}></input></h3>
                    <h3>Get done by: <input id="fdd" name="dueDate" type="date" onChange={handleChange}></input></h3>
                    {/* { (document.querySelector("#fmh").value.length > 0) && (document.querySelector("#fbh").value.length > 0) && (document.querySelector("#fdd").value.length > 0) && ( */}
                    { 2==2 && <button className="btn btn-success" onClick={handleSubmit}> SAVE </button>}
                    {/* )} */}

                </div>
            </div>  
        </div>
        </>
    )
};