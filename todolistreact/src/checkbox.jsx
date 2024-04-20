import { useState } from "react"

const CheckBox=(props)=>{
    var index = props.index-1
    var field = props.field.toString()
    return(
        <>
        <button onClick={()=>{
            props.setIndex(()=>{return(
            {index,field
            }
        )})}}  className="checkBox" style={{
            backgroundColor:"black!important"
        }}>
            {props.checked?props.icon:props.icon2}
        </button>
        </>
    )
}
export default CheckBox
