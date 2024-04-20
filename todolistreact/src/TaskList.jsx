import React, { useState, useEffect } from "react";
import IconButton from "./IconButton";
import { Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckBox from "./checkbox";
import { Modal } from "antd";
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
  StarOutlineOutlined,
  StarOutlined,
} from "@mui/icons-material";
import Ibutton from "./button";
import {
  ArrowForwardIosOutlined,
  ArrowBackIosNewOutlined,
  AddOutlined,
  PlaylistAddCircleOutlined,
} from "@mui/icons-material";

const ITEMS_PER_PAGE = 8;

const TaskList = (props) => {
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [newTask, addTask] = useState({
    taskName: "",
    location: "",
    date: 0,
    important: false,
    done: false,
  });
  const [data, setData] = useState(props.Idata);
  const [indexObj, setIndex] = useState({ index: -1, field: "" });
  const regex = /^[a-zA-Z0-9 ]+$/;
  const addTaskModal = () => {
    setModalIsOpen(true);
  };
  
  const handleAddTask = () => {
    try {
      if (!regex.test(newTask.taskName)) {
        alert("something is wrong in the task name ");
        return false;
      }
      if (newTask.location != 0 && !regex.test(newTask.location)) {
        alert("sometthing is wrong in the location name");
        return false;
      }
      if (!newTask.date) {
        alert("input date please");
        return false;
      }
      addTask(prev=>({...prev,date:prev.date.toString()}))
      props.addNewTask([newTask]);
    } catch {
      alert("you missed a required field");
    }
    addTask({ taskName: "", date: 0, location: "", important: false });
    setModalIsOpen(false);
  };
  const handleCancel = () => {
    setModalIsOpen(false);
  };
  function changeData() {
    props.setIdata((prev)=>{
      let nd = [...prev]
      if(indexObj.field == "done"){
        nd[indexObj.index].done = !nd[indexObj.index].done
        if(nd[indexObj.index].done){
          nd[indexObj.index].dateCompleted = new Date().getTime()
        }
        else{
          nd[indexObj.index].dateCompleted = ""
        }
      }
      else if(indexObj.field == "important"){
        nd[indexObj.index].important = !nd[indexObj.index].important
      }
      return nd
    })
    setIndex(() => ({ index: -1, field: "" }));
  }
  useEffect(() => {
    if (indexObj.index != -1) {
      changeData();
    }
  }, [indexObj]);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  useEffect(() => {
    if(data.length !=0){
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const tasksToShow = data.slice(startIndex, endIndex);
    setDisplayedTasks(tasksToShow);}
    else{
      setDisplayedTasks([])
    }
  }
  , [currentPage,data]);
useEffect(()=>{
  setData(props.Idata)
},[props.Idata])
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  function formatDate(date) {
    let x =
      new Date(date).getFullYear() +
      "-" +
      (new Date(date).getMonth() + 1).toString().padStart(2, "0") + // Adding 1 to getMonth() because it returns 0-indexed month (0 for January, 1 for February, etc.)
      "-" +
      new Date(date).getDate().toString().padStart(2, "0") + // Using getDate() to get the day of the month
      "T" +
      new Date(date).getHours().toString().padStart(2, "0") +
      ":" +
      new Date(date).getMinutes().toString().padStart(2, "0");
    return x;
  }
  
  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="taskList">
      {props.type=="today"?
      <div className="header">
        <h1>Welcome Back</h1>
      </div>:<div className="header">
        <h1>{props.name}</h1>
      </div>}
      <div
        style={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
       {props.type=="today"? <h3>{props.name} Tasks</h3>:""}
        <Ibutton
          name="Add Task"
          class="addtask"
          onClick={() => {
            addTaskModal();
          }}
          icon={<AddOutlined></AddOutlined>}
        ></Ibutton>
        <Modal
          className="modal"
          title="add task "
          open={ModalIsOpen}
          onOk={handleAddTask}
          onCancel={handleCancel}
        >
          Task Name :{" "}
          <input
            type="text"
            value={newTask.taskName}
            onChange={(e) =>
              addTask((prev) => {
                return { ...prev, taskName: e.target.value };
              })
            }
          />
          Date :{" "}
          <input
            type="datetime-local"
            value={formatDate(newTask.date)}
            onChange={(e) =>
              addTask((prev) => {
                return {
                  ...prev,
                  date: new Date(e.target.value).getTime(),
                };
              })
            }
          ></input>
          Location (optional){" "}
          <input
            type="text"
            value={newTask.location}
            onChange={(e) =>
              addTask((prev) => {
                return { ...prev, location: e.target.value };
              })
            }
          ></input>
          <div>
            important ?{" "}
            <input
              type="radio"
              checked={newTask.important}
              name="imp"
              value={true}
              onChange={() =>
                addTask((prev) => {
                  return { ...prev, important: true };
                })
              }
            />{" "}
            Yes{" "}
            <input
              checked={!newTask.important}
              type="radio"
              name="imp"
              onChange={() =>
                addTask((prev) => {
                  return { ...prev, important: false };
                })
              }
              value={false}
            />{" "}
            No{" "}
          </div>
        </Modal>
      </div>
      {displayedTasks.length>0?
      <TableContainer className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "10px",
                }}
              ></TableCell>
              <TableCell></TableCell>
              <TableCell sx={{ width: "10px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedTasks.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <CheckBox
                    checked={item.done}
                    field={"done"}
                    setIndex={setIndex}
                    index={item.id}
                    icon2={<CheckBoxOutlineBlankOutlined />}
                    icon={<CheckBoxOutlined></CheckBoxOutlined>}
                  />
                </TableCell>
                <TableCell>
                  {!item.done ? (
                    <p className="taskName">{item.taskName}</p>
                  ) : (
                    <p
                      style={{ textDecoration: "line-through" }}
                      className="taskName"
                    >
                      {item.taskName}
                    </p>
                  )}
                  <p className="time">
                    {String(new Date(parseInt(item.date)).getHours()).padStart(
                      2,
                      "0"
                    )}
                    :
                    {String(
                      new Date(parseInt(item.date)).getMinutes()
                    ).padStart(2, "0")}
                  </p>
                  {props.name=="completed"?<p>Completed On {new Date(parseInt(item.dateCompleted)).toDateString()}</p>:""}
                </TableCell>
                <TableCell>
                  <CheckBox
                    checked={!item.important}
                    field={"important"}
                    setIndex={setIndex}
                    index={item.id}
                    icon2={<StarOutlined sx={{ color: "#FFD700" }} />}
                    icon={<StarOutlineOutlined></StarOutlineOutlined>}
                  />
                </TableCell>
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>:
      <div style={{    height: "50%"}}><p> No {props.important?"important":""} tasks to do this Day</p></div>
      }
      <div className="pagination">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            icon2={<ArrowBackIosNewOutlined></ArrowBackIosNewOutlined>}
            icon={<ArrowBackIosNewOutlined></ArrowBackIosNewOutlined>}
          ></IconButton>
          <span>Page {currentPage}</span>
          <IconButton
            onClick={handleNextPage}
            icon2={<ArrowForwardIosOutlined></ArrowForwardIosOutlined>}
            icon={<ArrowForwardIosOutlined></ArrowForwardIosOutlined>}
            disabled={currentPage === Math.ceil(data.length / ITEMS_PER_PAGE)}
          ></IconButton>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
