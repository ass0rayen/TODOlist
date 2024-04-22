import { useEffect, useState } from "react"
import TaskList from "./TaskList"
const TodayPage = (props)=>{
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const [todayTasks,setTodayTasks] = useState([])
    useEffect(()=>{
        setTodayTasks(()=>props.fdata.filter((item) => {
          let y = new Date(props.todayDate);
          let yday = y.getDate();
          let ymonth = y.getMonth();
          let x = item.date;
          x = new Date(parseInt(x));
          let xday = x.getDate();
          let xmonth = x.getMonth();
          if (xday === yday && ymonth === xmonth) {
             return item
        }
        }))
      },[props.fdata,props.todayDate])
    return(<div className="todayPage">
        
        <TaskList type="today" name={new Date(props.todayDate).toLocaleDateString(undefined,options)} addNewTask = {props.addNewTask} setIdata={props.setIdata} Idata={todayTasks}>
            
        </TaskList>
    </div>)
}
export default TodayPage