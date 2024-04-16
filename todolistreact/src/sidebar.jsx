import SideButton from "./button"
import {BoltOutlined,PriorityHighOutlined,CalendarTodayOutlined,CheckOutlined,HistoryOutlined} from '@mui/icons-material';

const Sidebar= ()=>{
    return(
        <div className="sideBar">
            <><SideButton name="Today" icon = {<BoltOutlined/>}></SideButton></>
            <><SideButton icon = {<PriorityHighOutlined/>} name="Important"></SideButton></>
            <><SideButton icon = {<CalendarTodayOutlined/>}name="Calendar"></SideButton></>
            <><SideButton icon={<CheckOutlined/>} name="Completed Recently"></SideButton></>
            <><SideButton icon ={<HistoryOutlined/>} name="today"></SideButton></>
        </div>
    )
}
export default Sidebar