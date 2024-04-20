import { useEffect, useState } from "react"
import TaskList from "./TaskList"

const CompletedPage = (props)=>{
    const [completedTasks,setCompletedTasks] = useState([])
    useEffect(()=>{
        setCompletedTasks(()=>(props.fdata.filter((item)=>{
            let y = new Date(props.todayDate);
          let yday = y.getDate();
          let ymonth = y.getMonth();
          let x = item.date;
          x = new Date(parseInt(x));
          let xday = x.getDate();
          let xmonth = x.getMonth();
            return (item.done==true && xday == yday && ymonth == xmonth)

        })))
    },[props.fdata,props.todayDate])
    return(<div className="todayPage">
        <TaskList name={"completed"} addNewTask = {props.addNewTask} setIdata={props.setIdata} Idata={completedTasks}></TaskList>
    </div>)
}
export default CompletedPage