import TaskList from "./TaskList"
import Ibutton from "./button"
import SideButton from "./sideButton"
import { AddOutlined } from "@mui/icons-material"
const TodayPage = ()=>{
    return(<div className="todayPage">
        <div className="header"><h1>Welcome Back</h1>
        </div>
        <TaskList></TaskList>
    </div>)
}
export default TodayPage