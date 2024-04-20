import "./App.css";
import RestOfPage from "./restofpage";
import Sidebar from "./sidebar";
import data from "./data.json";
import { useEffect, useState } from "react";
function App() {
  const [Idata, setIdata] = useState(data);
  const [newTask, addNewTask] = useState([]);
  const [todayTasks, setTodayTasks] = useState(
    Idata.filter((item) => {
      let y = new Date();
      let yday = y.getDate();
      let ymonth = y.getMonth();
      let x = item.date;
      x = new Date(parseInt(x));
      let xday = x.getDate();
      let xmonth = x.getMonth();

      if (xday == yday && ymonth == xmonth) {
        return item;
      }
    })
  );
  useEffect(() => {
    addNewTask([]);
  }, [Idata]);
  useEffect(() => {
    if (newTask.length !== 0) {
      const newTaskWithID = {
        ...newTask[0],
        id: Idata.length + 1,
      };
      let y = new Date();
      let yday = y.getDate();
      let ymonth = y.getMonth();
      let x = newTask[0].date;
      x = new Date(parseInt(x));
      let xday = x.getDate();
      let xmonth = x.getMonth();
      if (xday == yday && ymonth == xmonth) {
        setTodayTasks((prev) => [...prev, newTaskWithID]);
      } else {
        console.log("not",newTaskWithID)
        setIdata((prevData) => [...prevData, newTaskWithID]);
      }
    }
  }, [newTask]);
  useEffect(() => {
    let newData = [...Idata];
    todayTasks.map((item) => {
      newData[item.id - 1] = item;
    });
    setIdata(() => newData);
    //setCompletedTasks(()=>)
  }, [todayTasks]);
  
  useEffect(()=>{    
    setCompletedTasks(() => Idata.filter((item) => item.done));
    setImportantTasks(() => Idata.filter((item) => item.important));
  },[Idata])
  const [importantTasks, setImportantTasks] = useState(
    Idata.filter((item) => item.important)
  );
  const [completedTasks, setCompletedTasks] = useState(
    Idata.filter((item) => item.done)
  );
  useEffect(() => {
    let newData = [...Idata];
    importantTasks.map((item) => {
      newData[item.id - 1] = item;
    });
    setIdata(() => newData);
    //setCompletedTasks(()=>)
  }, [importantTasks]);
  return (
    <div className="all">
      <Sidebar
        todayTasks={todayTasks}
        importantTasks={importantTasks}
        completedTasks={completedTasks}
      ></Sidebar>
      <RestOfPage
      importantTasks = {importantTasks}
        addNewTask={addNewTask}
        setTasks={setTodayTasks}
        setImportantTasks={setImportantTasks}
        todayTasks={todayTasks}
      />
    </div>
  );
}

export default App;
