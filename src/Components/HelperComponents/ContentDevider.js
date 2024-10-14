import React from 'react'

export default function ContentDevider(props) {
  return (
    <div class="centered-rule">
       {props.img? <img width="50px" height="50px" src={props.img}/>:null}
        <h3 style={{fontSize:23,marginLeft:20}}>{props.title}</h3>
    </div>
  )
}
