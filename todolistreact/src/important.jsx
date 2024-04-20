import TaskList from "./TaskList"

const ImportantPage = (props)=>{
    return(<div className="todayPage">
        
        <TaskList addNewTask = {props.addNewTask} setTasks = {props.setTasks} Idata={props.Idata}></TaskList>
    </div>)
}
export default ImportantPage