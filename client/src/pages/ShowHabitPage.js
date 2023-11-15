import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


const userDB = {
    habits: [
        {
            "habitId": 100,
            "makeHabit": "100m x 10 dash",
            "breakHabit": "No high calorie intake",
            "progress": 50,
            "daysRemaining": 5,
            "streak": 0,
            "days": 6
        },
        {
            "habitId": 101,
            "makeHabit": "Curl ups",
            "breakHabit": "",
            "progress": 0,
            "streak": 0,
            "days": 12
        },
        {
            "habitId": 102,
            "makeHabit": "Pull ups",
            "breakHabit": "",
            "progress": 0,
            "streak": 0,
            "days": 14
        }
]}

export default function ShowHabitPage(props){
  const params = useParams();
  
  useEffect(() => {
    setCurrHabit(userDB.habits.find(x => x.habitId == params.id));
    return () => setCurrHabit(null)
  }, [params]);

    //parseInt(document.querySelector(`.navList.active.currHabit`).id.slice(1))
  const [currHabit, setCurrHabit] = useState(userDB.habits.find(x => x.habitId == params.id));
  const [count, setCount] = useState(0); //Streak count 
  var [highestCount, setHighestCount] = useState(0);
//   console.log(userDB.habits, habitInx);
  const [days, setDays] = useState(currHabit.days);
  const [initDays] = useState(days);    
  var [progress, setProgress] = useState(0); //Sets progress equal to INITIAL value of days
  // var [goalMet, setGoalMet] = useState(0); 
  const [logged, setLogged] = useState(0)
// console.log(parseInt(document.querySelector(`.navList.active.currHabit`).id.slice(1)))
//   setCurrHabit(parseInt(document.querySelector(`.navList.active.currHabit`).id.slice(1)))
function Log() {
  setCount(count + 1); setLogged(1); if (progress < initDays) setProgress(progress + 1); CheckGoal(0);
}

function logCheck() { 
  return (logged === 0 && currHabit.days !== 0) ? (<button className="btn btn-success mx-3" onClick={() => Log()}> Log </button>) : (<p></p>);
}

function passDay() {
  if (days > 0) setCurrHabit({...currHabit,days:currHabit.days-1}); if (logged === 0) setCount(0); setLogged(0);
}

function Reset() {
  setCount(0); setDays(initDays); setProgress(0); CheckGoal(); setLogged(0); setHighestCount(0);
} 

function CheckGoal() { 
  if (days === 0) return (progress === initDays) ? <p className="text-success"> Met </p> : <p className="text-danger"> Not Met </p>;
  else return <p className="text-primary"> In Progress </p>;
}

function CheckStreak() {
  return (count > highestCount) ? setHighestCount(count) : highestCount;
} 

function calcKarma() {
  return (highestCount * 50) + ((progress / initDays) * 100) * 3;
} 

function endStats() {
  return (days === 0) && (
    <div>
      <h1> Highest Streak: {CheckStreak()} </h1>  
      <h1> Total Progress: {progress * 10}% </h1> 
      <h1> KARMA Earned: {calcKarma()} </h1> 
    </div>
  );
}

    return (
        <>
        
        <div className = "container">
        <div>
            ShowHabitPage {params.id}
        </div>
        <div id="makeBreakBox">
                <h2> <strong className="text-success"> MAKE:</strong> {currHabit.makeHabit} </h2> 
                <h2> <strong className="text-danger"> BREAK:</strong> {currHabit.breakHabit} </h2>
        </div>
        <div className="card text-center my-5 border border-dark"> 

        <div className = "card-body row"> 
            
            <h1 className="pb-5 fw-bold">Habits Progress</h1>   
            {/* <h1>{logged}</h1>  */} 

            {/* Streak Display */}
            <div className="col"> 
                <h2 className = "my-5 fw-bold text-warning"> Streak  </h2>   
                <h2> x {count}</h2>
            </div>  

            {/* Days Display */}
            <div className="col"> 
                <h2 className = "my-5 fw-bold"> Days Left </h2>    
                <h2> {currHabit.days} </h2>
            </div> 

            {/* Progress Display */}
            <div className="col"> 
                <h2 className = "my-5 fw-bold text-info"> Progress </h2>   
                <h2> { Math.ceil((progress / initDays)  * 100)}% </h2> 
            </div>
        </div>
        {/* rating part of strak */} 

        <div className="p-3">
            {/* Increase Count */} 
                {/* Possibly change functionality, so that logging can only be done ONCE per day */}
                {logCheck()}  

                {/* Decrease Day */}
                <button className = "btn btn-primary mx-3"
                onClick={() => passDay() }
                > Pass Day </button>
                
                {/* Reset Count (for testing purposes) */}
                <button className = "btn btn-danger mx-3"
                onClick={() => Reset() }> Reset </button>
        </div>
        
        </div>

        
        <div className="card text-center my-5"> 
        <div className = "card-body row border border-dark"> 
            <h1 className="pb-5 fw-bold">Goal Status</h1>  
            <h2 className="fw-bold"> {CheckGoal()} </h2> 
        
            <div>
                {endStats()}
            </div> 
        </div>
        </div>


    </div>
        </>
    )
};  