import React, { useState, useEffect } from 'react';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CheckBoxOutlineBlankOutlined } from '@mui/icons-material';
import Ibutton from './button';
import data from './data.json'; // Import your data JSON file
import { ArrowForwardIosOutlined,ArrowBackIosNewOutlined } from '@mui/icons-material';

const ITEMS_PER_PAGE = 5;

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedTasks.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.taskName}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  <Ibutton icon={<CheckBoxOutlineBlankOutlined />} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div class="pagination">
        <Ibutton onClick={handlePrevPage} class="changePage" disabled={currentPage === 1} icon={<ArrowBackIosNewOutlined></ArrowBackIosNewOutlined>}></Ibutton>
        <span>Page {currentPage}</span>
        <Ibutton onClick={handleNextPage}  class="changePage" icon={<ArrowForwardIosOutlined></ArrowForwardIosOutlined>} disabled={currentPage === Math.ceil(data.length / ITEMS_PER_PAGE)}></Ibutton  >
      </div>
    </div>
  );
};

export default TaskList;
