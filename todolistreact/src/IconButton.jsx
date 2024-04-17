const IconButton = (props)=>{
    return(
        <>
        <button onClick={props.onClick}  className="changePage" style={{
            backgroundColor:"black!important"
        }}>
            {props.icon}
        </button>
        </>
    )
}
export default IconButton