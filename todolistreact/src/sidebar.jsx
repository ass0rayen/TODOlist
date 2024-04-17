import SideButton from "./button"
import {LightOutlined,PriorityHighOutlined,CalendarTodayOutlined,CheckOutlined,HistoryOutlined} from '@mui/icons-material';

const Sidebar= ()=>{
    return(
        <div className="sideBar">
            <><SideButton name="Today" icon = {<LightOutlined className="icon1"/>}></SideButton></>
            <><SideButton icon = {<PriorityHighOutlined className="icon2" />} name="Important"></SideButton></>
            <><SideButton icon = {<CalendarTodayOutlined className="icon3"/>} name="Calendar"></SideButton></>
            <><SideButton icon={<CheckOutlined className="icon4" />} name="Completed"></SideButton></>
            <><SideButton icon ={<HistoryOutlined className="icon5" />} name="today"></SideButton></>
        </div>
    )
}
export default Sidebar