import SideButton from "./sideButton"
import {LightOutlined,PriorityHighOutlined,CalendarTodayOutlined,CheckOutlined,HistoryOutlined, PropaneSharp} from '@mui/icons-material';

const Sidebar= (props)=>{
    return(
        <div className="sideBar">
            <><SideButton name="Today" icon = {<LightOutlined className="icon icon1"/>} number = {props.todayTasks.length}></SideButton></>
            <><SideButton icon = {<PriorityHighOutlined className="icon icon2" />} number = {props.importantTasks.length} name="Important"></SideButton></>
            <><SideButton icon = {<CalendarTodayOutlined className="icon icon3"/>} name="Calendar"></SideButton></>
            <><SideButton icon={<CheckOutlined className="icon icon4" />} number={props.completedTasks.length} name="Completed"></SideButton></>
            <><SideButton icon ={<HistoryOutlined className="icon icon5" />} name="today"></SideButton></>
        </div>
    )
}
export default Sidebar