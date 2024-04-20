import SideButton from "./sideButton"
import {LightOutlined,PriorityHighOutlined,CalendarTodayOutlined,CheckOutlined,HistoryOutlined, PropaneSharp} from '@mui/icons-material';

const Sidebar= (props)=>{
    return(
        <div className="sideBar">
            <><SideButton onClick={()=>props.setActivePage(0)} name="Today" icon = {<LightOutlined className="icon icon1"/>} number = {props.nOfTodayTasks}></SideButton></>
            <><SideButton onClick={()=>props.setActivePage(1)} icon = {<PriorityHighOutlined className="icon icon2" />} number = {props.nOfImportantTasks} name="Important"></SideButton></>
            <><SideButton  onClick={()=>props.setActivePage(2)} icon = {<CalendarTodayOutlined className="icon icon3"/>} name="Calendar"></SideButton></>
            <><SideButton onClick={()=>props.setActivePage(3)} icon={<CheckOutlined className="icon icon4" />} number={props.nOfcompletedTasks} name="Completed"></SideButton></>
        </div>
    )
}
export default Sidebar