import TodayPage from "./todayPage";
import { useEffect, useState } from "react";
import { Badge, Calendar, Modal } from "antd";
import ImportantPage from "./important";
import CompletedPage from "./completed";
import { PieChart } from "@mui/x-charts/PieChart";
const RestOfPage = (props) => {
  const [ModalIsOpen, openModal] = useState(false);
  const [nCToday,setnCToday] = useState(0)
  function selectDate(info) {
    props.setTodayDate(info.toDate().getTime());
    if (props.activePage == 2) {
      openModal(true);
    }
  }
  const [data, setData] = useState(props.fdata);
  const [todayTasks, setTodayTasks] = useState([]);
  useEffect(() => {
    setnCToday(0);
    setTodayTasks(() =>
      props.fdata.filter((item) => {
        let y = new Date(props.todayDate);
        let yday = y.getDate();
        let ymonth = y.getMonth();
        let x = item.date;
        x = new Date(parseInt(x));
        let xday = x.getDate();
        let xmonth = x.getMonth();
        
        if (xday == yday && ymonth == xmonth) {
          if(item.done==true){
            setnCToday(prev=>prev+1)
          }
          return item;
        }

      })
    );
  }, [props.fdata, props.todayDate]);
  useEffect(() => {
    setData(props.fdata);
  }, [props.fdata]);
  function CellRender(value, info) {
    if (info.type === "date") {
      let nd = data.filter((item) => {
        return (
          new Date(parseInt(item.date)).getMonth() == value.month() &&
          new Date(parseInt(item.date)).getDate() == value.date()
        );
      });
      return nd.length >= 1 && nd.length < 6 ? (
          nd.map((item)=>(<div style={{backgroundColor:(parseInt(item.time/(10**6))),width:"100%"}}>TST</div>))
      ) : nd.length >= 6 && nd.length < 13 ? (
        <ul style={{ color: "#9500ff" }}>
          <li></li>
        </ul>
      ) : nd.length >= 13 ? (
        <ul style={{ color: "red" }}>
          <li></li>
        </ul>
      ) : (
        <></>
      );
    }
  }
  useEffect(() => {
    console.log(todayTasks);
  }, [todayTasks]);
  return (
    <div className="restOfpage">
      <Modal
        open={ModalIsOpen}
        onOk={() => openModal(false)}
        onCancel={() => openModal(() => false)}
      >
        {todayTasks.length > 0 ? (
          <div>
            <h3>Tasks On this Day : </h3>
            <ul>
              {todayTasks.map((item) => (
                <li
                  style={
                    item.dateCompleted != ""
                      ? { textDecoration: "line-through" }
                      : {}
                  }
                >
                  {item.taskName} ,{" "}
                  {item.dateCompleted != ""
                    ? new Date(parseInt(item.dateCompleted)).toDateString() +
                      "    ,    "
                    : ""}
                  {item.location}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No tasks On this Day</p>
        )}
      </Modal>
      {props.activePage == 0 && (
        <TodayPage
          todayDate={props.todayDate}
          fdata={props.fdata}
          setIdata={props.setIdata}
          addNewTask={props.addNewTask}
        />
      )}
      {props.activePage == 1 && (
        <ImportantPage
          fdata={props.fdata}
          setIdata={props.setIdata}
          addNewTask={props.addNewTask}
          todayDate={props.todayDate}
        ></ImportantPage>
      )}
      {props.activePage == 3 && (
        <CompletedPage
          fdata={props.fdata}
          setIdata={props.setIdata}
          addNewTask={props.addNewTask}
          todayDate={props.todayDate}
        ></CompletedPage>
      )}
      <div
        className="calendar"
        style={props.activePage == 2 ? { width: "90%" } : { width: "40%" }}
      >
        <Calendar
          onSelect={selectDate}
          cellRender={CellRender}
          fullscreen={props.activePage == 2 ? true : false}
          className="calendar"
          style={{ width: "100%" }}
        ></Calendar>
        {props.activePage!=2 &&<div style={{
          height: "50%",
          width: "100%",
          }}>
      <PieChart className="pie" width={600} height={300}
  series={[
    {
      
      data: [{id:0,value:nCToday,label:"completed Today",color:"green"},{id:1,value:todayTasks.length-nCToday,color:"red",label:"still not completed  "}]
      ,
      innerRadius: 70,
      outerRadius: 90,
      paddingAngle: 0,
      cornerRadius: 20,
      startAngle: 0,
      endAngle: 359,
      cx: 149,
      cy: 150,
    }
  ]}
/>
      </div>}
      </div>
      
    </div>
  );
};
export default RestOfPage;
