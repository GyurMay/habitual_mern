import React, { useState } from "react";
import "../index.css"; 
import { useAuth } from "../context/AuthContext";
// console.log(JSON.stringify(userHabitsStats))
export default function Profile (props) {
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
    // const currUser = {
    //     imgSrc: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80',
    //     name: 'Dorjee Lama',
    //     motto: 'DD Hard work'
    // };
    const auth = useAuth();
    const currUser = {
        imgSrc: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80',
        ...auth.user
    }
    console.log(currUser)
    return (
        <>
        {/* <NavBar /> */}
        <div id="main">
            <div className="container text-start">
            <>
                <div id="about-box">
                    <img src={currUser.imgSrc} width="200" height="200"/>
                    <h1><strong>Name: </strong>{currUser.name}</h1>
                    <h1><strong>Motto:</strong> {currUser.motto}</h1>
                </div>
                <br />
                <h3><b>Current stats</b></h3>
                <div id="allHabits">
                    <ul id="allList">
                        {
                            userDB.habits.map(x => (
                                <li key={x.habitId}>
                                    <div id="mkHb"> {x.makeHabit}</div>
                                    <span id="progress">Progress: <b>{x.progress}%</b></span>
                                    <span id="daysLeft">Days Remaining: <b>{x.days}</b></span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </>
            </div>
        </div>
        </>
    );
  }