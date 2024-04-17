const Ibutton =(props)=>{
    return(
        <>
        <button onClick={props.onClick} className= {"sideButt " + props.class} >
        {props.icon}{props.name}
    </button>
        </>
    )
}
export default Ibutton