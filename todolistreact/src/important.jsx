import { useEffect, useState } from "react"
import TaskList from "./TaskList"

const ImportantPage = (props)=>{
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const [importantTasks,setImportantTasks] = useState([])
    useEffect(()=>{
        setImportantTasks(()=>(props.fdata.filter((item)=>{
            let y = new Date(props.todayDate);
          let yday = y.getDate();
          let ymonth = y.getMonth();
          let x = item.date;
          x = new Date(parseInt(x));
          let xday = x.getDate();
          let xmonth = x.getMonth();
            return (item.important===true && xday === yday && ymonth === xmonth)

        })))
    },[props.fdata,props.todayDate])
    return(<div className="todayPage">
        <TaskList important={true} todayDate={props.todayDate} name= {"important " + new Date(props.todayDate).toLocaleDateString(undefined,options)} addNewTask = {props.addNewTask} setIdata={props.setIdata} Idata={importantTasks}></TaskList>
    </div>)
}
export default ImportantPage