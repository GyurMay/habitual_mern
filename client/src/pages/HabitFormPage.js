import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HabitFormPage(props){

  const params = useParams();
  const auth = useAuth();
  
  const [mh, setMh] = useState(params.makeHabit);
  const [bh, setBh] = useState("");
    // useState
  const [fdd, setFdd] = useState("");
  const [habitError, setHabitError] = useState(false);

  useEffect(() => {
    setMh(params.makeHabit); setBh(""); setFdd("");
  }, [params])
    
  const handleChange = (event) => {
    setBh(document.querySelector("#fbh").value);
    setMh(document.querySelector("#fmh").value);
    setFdd(document.querySelector("#fdd").value);
  }
  let host = 'http://localhost:3001';
  const navigate = useNavigate();
  const createHabit = async (jsonObj) => {
    //makeRequest
    try{

      const response = await fetch(host+'/api/habit/create', {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({content: jsonObj, user: auth.user }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if(!response.ok){
        setHabitError(true);
        throw new Error("Can't create Habit");
      }
      navigate('/habits/');
    }catch(e){
      console.log(e)
    }
  }
function handleSubmit(event){
    event.preventDefault();
    if(mh === '' || bh === '' || fdd === '') return

    let daysRemaining = parseInt((((new Date(fdd)) - new Date())) / 1000 / 60/ 60 / 24) + 1;
    let lastId = document.querySelector('#navHabitList').lastElementChild.previousElementSibling.id.slice(1);
    let habitId = parseInt(lastId) + 1;
    console.log(habitId, mh, bh, daysRemaining)
    const habitObj = {
          habitId,
          makeHabit: mh,
          breakHabit: bh,
          daysRemaining,
          progress: 0,
          streak: 0
    }
    console.log(habitObj);

    createHabit(habitObj)
    // let currLatestId = 103;

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
                    {habitError && (<p className="text-danger">error: cant create habit</p>)}
                    <h3>Make Habit: <input id="fmh" name="makeHabit" value={mh} onChange={handleChange}></input></h3>
                    <h3>Break Habit: <input id="fbh" name="breakHabit" onChange={handleChange}></input></h3>
                    <h3>Get done by: <input id="fdd" name="dueDate" type="date" onChange={handleChange}></input></h3>
                    {/* { (document.querySelector("#fmh").value.length > 0) && (document.querySelector("#fbh").value.length > 0) && (document.querySelector("#fdd").value.length > 0) && ( */}
                    <button className="btn btn-success" onClick={handleSubmit}> SAVE </button>
                    {/* )} */}

                </div>
            </div>  
        </div>
        </>
    )
};