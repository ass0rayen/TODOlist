const SideButton = (props)=>{
    return(
    <>
    <button className="sideButt" >
        {props.icon}{props.name}
    </button>
    </>)
}
export default SideButton