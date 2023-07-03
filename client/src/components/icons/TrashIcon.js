import * as React from "react";


function PostToDB(userDB){
    console.log(1,'called')
}

function deleteHabit(habitId){
    // del the habit from the DB
    // post the new userDB to the backend
    // console.log("Clicked on delete button");
    // let userDB = JSON.parse(sessionStorage.userDB);
    // userDB.habits = userDB.habits.filter(x => x[habitId] === undefined);
    // console.log("new habits after deleting "+habitId, userDB.habits);
    // PostToDB(JSON.stringify(userDB));
    console.log(2,'called')
}

const TrashIcon = (props) => (
  <svg
    className="del-btn"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    id={"del-"+props.habitId}
    onClick = {() => deleteHabit(props.habitId)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <style>{"\n      .cls-1{fill:#41416e;}\n    "}</style>
    </defs>
    <title>{"trash"}</title>
    <g id="trash-Regular">
      <path
        id="trash-Regular-2"
        data-name="trash-Regular"
        className="cls-1"
        d="M21,5.25H17.441A1.251,1.251,0,0,1,16.255,4.4l-.316-.95a1.746,1.746,0,0,0-1.66-1.2H9.721a1.745,1.745,0,0,0-1.66,1.2l-.316.948a1.251,1.251,0,0,1-1.186.855H3a.75.75,0,0,0,0,1.5H4.3l.767,11.5a3.76,3.76,0,0,0,3.742,3.5h6.386a3.76,3.76,0,0,0,3.742-3.5L19.7,6.75H21a.75.75,0,0,0,0-1.5ZM9.483,3.921a.252.252,0,0,1,.238-.171h4.558a.252.252,0,0,1,.238.17l.316.95a2.777,2.777,0,0,0,.161.38H9.006a2.737,2.737,0,0,0,.161-.381ZM17.438,18.15a2.255,2.255,0,0,1-2.245,2.1H8.807a2.255,2.255,0,0,1-2.245-2.1L5.8,6.75h.757a2.783,2.783,0,0,0,.317-.025A.736.736,0,0,0,7,6.75H17a.736.736,0,0,0,.124-.025,2.783,2.783,0,0,0,.317.025H18.2ZM14.75,11v5a.75.75,0,0,1-1.5,0V11a.75.75,0,0,1,1.5,0Zm-4,0v5a.75.75,0,0,1-1.5,0V11a.75.75,0,0,1,1.5,0Z"
      />
    </g>
  </svg>
);
export default TrashIcon;