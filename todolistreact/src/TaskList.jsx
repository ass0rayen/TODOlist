import React, { useState, useEffect } from 'react';
import IconButton from './IconButton';
import {Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckBox from './checkbox';
import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined } from '@mui/icons-material';
import Ibutton from './button';
import data from './data.json'; 
import { ArrowForwardIosOutlined,ArrowBackIosNewOutlined } from '@mui/icons-material';

const ITEMS_PER_PAGE = 7;

const TaskList = () => {
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
      <TableContainer className='table'>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell sx={{
              width:"10px"
            }}></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedTasks.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <CheckBox done={item.done} icon2={<CheckBoxOutlineBlankOutlined />}icon={<CheckBoxOutlined></CheckBoxOutlined>}  />
                </TableCell>
                <TableCell>{item.taskName}</TableCell>
                <TableCell>{item.time}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <IconButton onClick={handlePrevPage} disabled={currentPage === 1} icon2={<ArrowBackIosNewOutlined></ArrowBackIosNewOutlined>} icon={<ArrowBackIosNewOutlined></ArrowBackIosNewOutlined>}></IconButton>
        <span>Page {currentPage}</span>
        <IconButton onClick={handleNextPage} icon2={<ArrowForwardIosOutlined></ArrowForwardIosOutlined>} icon={<ArrowForwardIosOutlined></ArrowForwardIosOutlined>}  disabled={currentPage === Math.ceil(data.length / ITEMS_PER_PAGE)}></IconButton  >
      </div>
    </div>
  );
};

export default TaskList;
