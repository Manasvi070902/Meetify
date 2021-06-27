import React,{useState} from 'react';
import MainBoard from "./Main-Board";

import './board.css';

const Board =(props)=>{
   const [color,setColor] = useState("#000000")
   const [size,setSize] = useState("10")
   
    //color fuctions
    const changeColor = (params) => {
        setColor(params.target.value)
    }
    const changeSize = (params) => {
        setSize(params.target.value)
    }


        return (

            <div className="mt-5 b-container">
                <div class="tools-section">
                    <div className="color-picker">Color : &nbsp; 
                        <input type="color" value={color} onChange={changeColor.bind(this)}/>
                    </div>

                    <div className="size">Size : &nbsp; 
                        <select value={size} onChange={changeSize.bind(this)}>
                            <option> 5 </option>
                            <option> 10 </option>
                            <option> 15 </option>
                            <option> 20 </option>
                            <option> 25 </option>
                            <option> 30 </option>
                        </select>
                    </div>

                </div>

                <div class="board-container">
                    <MainBoard color={color} size={size}></MainBoard>
                </div>
            </div>
        )
    }


export default Board