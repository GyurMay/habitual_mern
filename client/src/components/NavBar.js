import React, { useEffect, useState } from "react";
import "../index.css"; 
import TrashIcon from "./icons/TrashIcon";
import { Link, Navigate } from "react-router-dom";

// const habitDB = [
//     [100, "Jog everyday", "Daily junk food"],
//     [101, "50 pushups daily", "idling away time"],
//     [102, "3 miles running", "improve cardio endurance"]
//     ];

const ExpandMenuBtn = (props) => {
    return (
        <div id="hamburger-expand-btn" onClick={() => openNav()}>
            <svg width="60px" height="60px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z" /></svg>
        </div>
    );
};

function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
}
function closeNav() {
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("mySidenav").style.width = "0";
    if(document.querySelector("#new-in-val") != undefined){
        document.querySelector("#new-in-val").remove();
        
    }
} 
const ProfileLink = (props) => {
    return (
    <div className={'navList'}>
        <Link to='/profile'>Profile</Link>
    </div>
    );
}

// setNavLinks();
const NavBar = (props) => {
    window.onkeydown = (e) => {
        if(e.key === "Enter"){
            console.log('creating /create/'+document.querySelector("#new-in-val").value)
            document.location = "/create/"+document.querySelector("#new-in-val").value;
            // <Navigate to="/create" replace={true} />
        }
      }

    useEffect(() => {
        openNav();
    }, []);
    const userDB = {habits: [
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
                "habitId":101,
                "makeHabit": "Curl ups",
                "breakHabit": "",
                "progress": 0,
                "streak": 0,
                "days": 12
            },
            {
                "habitId":102,
                "makeHabit": "Pull ups",
                "breakHabit": "",
                "progress": 0,
                "streak": 0,
                "days": 14
            },
    ]}
    // const habitDB = [];
    // userDB.habits.forEach(x => {
    //         habitDB.push([x.habitId,
    //                     x.makeHabit,
    //                     x.breakHabit]);
    //     });


    // let urlParams = new URLSearchParams(document.location.search);
    const habitId = parseInt(document.location.href.split("/habits/")[1]);

    // const currHabit1 = (habitInx === -1 ) ? habitDB[0] : habitDB[habitInx]; //stores whatever page we currently on

    const [navLinks, setNavLinks] = useState(userDB.habits);
    const [currHabit, setCurrHabit] = useState(navLinks.find(x => x.habitId === habitId));

    const [newHabitInput, setNewHabitInput] = useState(false);

    function addNewTask(){
        if(!newHabitInput){
            let ina = document.createElement("input");
            ina.id = "new-in-val";
            ina.placeholder = "new name here";
            document.querySelector("#navHabitList").insertBefore(ina, document.querySelector("#navHabitList").children[document.querySelector("#navHabitList").childElementCount - 1]);
            ina.focus();
            setNewHabitInput(true);
        }
        setNewHabitInput(false)
    }

    return (
        <>
        <div id="mySidenav" className="sidenav">
            <button className="addBtn" onClick={() => addNewTask()}>+</button>
            <button className="closebtn" onClick={() => closeNav()}>&times;</button>
            <div id="navHabitList">
                {
                    navLinks.map(h => (
                        //if not current habit then class=inactive else class="active currHabit"
                        // console.log(h[0]) ||
                        <div id={'H'+h.habitId} className={"navList " + (h.habitId == currHabit.habitId ? "active currHabit" : '') }>
                            <a key={h.habitId} href={"/habits/"+h.habitId} onClick={() => {} }>
                                {h.makeHabit}</a> {/*if 22 is set to 0 then the a[href] for profile will be /profile */}
                            <TrashIcon key={h.habitId+"-del"} habitId={"habitId"+h.habitId} />
                        </div>
                        )
                    )
                }
                <ProfileLink />
            </div>
        </div>
        <ExpandMenuBtn />
        </>
        );
  };
// openNav();
  export {NavBar, ExpandMenuBtn};