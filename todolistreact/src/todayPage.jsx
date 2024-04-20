import TaskList from "./TaskList"
import Ibutton from "./button"
import SideButton from "./sideButton"
import { AddOutlined } from "@mui/icons-material"
const TodayPage = (props)=>{
    return(<div className="todayPage">
        
        <TaskList addNewTask = {props.addNewTask} setTasks = {props.setTasks} Idata={props.Idata}></TaskList>
    </div>)
}
export default TodayPage