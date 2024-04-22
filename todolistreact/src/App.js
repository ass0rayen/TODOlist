import "./App.css";
import RestOfPage from "./restofpage";
import Sidebar from "./sidebar";
import data from "./data.json";
import { useEffect, useState } from "react";
function App() {
  const [Idata, setIdata] = useState(data);
  const [newTask, addNewTask] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [todayDate,setTodayDate] = useState(new Date().getTime());
  const [nOfTodayTasks, setNOfTodayTasks] = useState(0);
  const [nOfImportantTasks, setNOfImportantTasks] = useState(0);
  const [nOfcompletedTasks, setNOfCompletedTasks] = useState(0);
  useEffect(() => {
    if (newTask.length !== 0) {
      const newTaskWithID = {
        ...newTask[0],
        id: Idata.length + 1,
      };
      setIdata((prevData) => [...prevData, newTaskWithID]);
    }
  }, [newTask,Idata.length]);

  useEffect(() => {
    setNOfCompletedTasks(Idata.filter((item) => item.done).length);
    setNOfImportantTasks(Idata.filter((item) => item.important).length);
    setNOfTodayTasks(()=>Idata.filter((item) => {
      let y = new Date(todayDate);
      let yday = y.getDate();
      let ymonth = y.getMonth();
      let x = item.date;
      x = new Date(parseInt(x));
      let xday = x.getDate();
      let xmonth = x.getMonth();
      if (xday === yday && ymonth === xmonth) {
         return item
    }
    }).length)
  }, [Idata,todayDate]);
  return (
    <div className="all">
      <Sidebar
        setActivePage={setActivePage}
        nOfTodayTasks={nOfTodayTasks}
        nOfcompletedTasks={nOfcompletedTasks}
        nOfImportantTasks={nOfImportantTasks}
      ></Sidebar>
      <RestOfPage
      nOfTodayTasks={nOfTodayTasks}
      nOfcompletedTasks={nOfcompletedTasks}
      nOfImportantTasks={nOfImportantTasks}
      todayDate = {todayDate}
      setTodayDate = {setTodayDate}
        activePage={activePage}
        addNewTask={addNewTask}
        setIdata={setIdata}
        fdata={Idata}
      />
    </div>
  );
}

export default App;
