import { useState } from "react"

const CheckBox=(props)=>{
    const [isChecked,setIsChecked] = useState(0)
    return(
        <>
        <button onClick={()=>setIsChecked((prev)=>(!prev))}  className="changePage" style={{
            backgroundColor:"black!important"
        }}>
            {isChecked?props.icon:props.icon2}
        </button>
        </>
    )
}
export default CheckBox
