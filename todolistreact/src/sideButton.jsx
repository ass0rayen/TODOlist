const SideButton = (props)=>{
    return(
    <>
    <button className="sideButt" onClick={props.onClick} >
        {props.icon}<div style={{display:"flex",width:"100%",height:"100%",alignItems:"center",marginLeft:"5%"}}>{props.name}</div><p>{props.number&&props.number}</p>
    </button>
    </>)
}
export default SideButton