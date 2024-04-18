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
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
  StarOutlineOutlined,
  StarOutlined,
} from "@mui/icons-material";
import Ibutton from "./button";
import Idata from "./data.json";
import {
  ArrowForwardIosOutlined,
  ArrowBackIosNewOutlined,
  AddOutlined,
  PlaylistAddCircleOutlined,
} from "@mui/icons-material";

const ITEMS_PER_PAGE = 8;

const TaskList = () => {
  const [data, setData] = useState(Idata);
  const [indexObj, setIndex] = useState({ index: -1, field: "" });
  function changeData() {
    console.log(indexObj)
    var tdata = data;
    if (indexObj.field == "done") {
      tdata[indexObj.index].done = !tdata[indexObj.index].done;
    } else if(indexObj.field == "important") {
      tdata[indexObj.index].important = !tdata[indexObj.index].important;
    }
    setData(() => {
      return tdata;
    });
    setIndex(()=>({index:-1,field:""}));
  }
  useEffect(() => {
    if (indexObj.index != -1) {
      changeData(indexObj);
    }
  }, [indexObj]);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const tasksToShow = data.slice(startIndex, endIndex);
    setDisplayedTasks(tasksToShow);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="taskList">
      <Ibutton
        name="Add Task"
        class="addtask"
        icon={<AddOutlined></AddOutlined>}
      ></Ibutton>
      <h3>Today's Tasks</h3>

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
              <TableCell></TableCell>
              <TableCell></TableCell>
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
                    index={index + ITEMS_PER_PAGE * (currentPage - 1)}
                    icon2={<CheckBoxOutlineBlankOutlined />}
                    icon={<CheckBoxOutlined></CheckBoxOutlined>}
                  />
                </TableCell>
                <TableCell>
                  <p className="taskName">{item.taskName}</p>
                  <p className="time">{item.time}</p>
                </TableCell>
                <TableCell>
                  {" "}
                  <CheckBox
                  clas
                    checked={item.important}
                    field={"important"}
                    setIndex={setIndex}
                    index={index + ITEMS_PER_PAGE * (currentPage - 1)}
                    icon2={<StarOutlined sx={{color:"#FFD700"}}/>}
                    icon={<StarOutlineOutlined></StarOutlineOutlined>}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <Ibutton
          name="Save"
          class="addtask"
          icon={<PlaylistAddCircleOutlined></PlaylistAddCircleOutlined>}
        ></Ibutton>
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
