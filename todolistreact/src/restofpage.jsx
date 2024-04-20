import TodayPage from "./todayPage";
import { useState } from "react";
import {Calendar} from 'antd'
import ImportantPage from "./important";
const RestOfPage = (props) => {
  return (
    <div className="restOfpage">
      <TodayPage addNewTask = {props.addNewTask} setTasks = {props.setTasks} Idata={props.todayTasks} />
      
    </div>
  );
};
export default RestOfPage;
