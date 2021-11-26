import React from "react";
import Button from "@mui/material/Button";
import BootstrapNavbar from "../components/Navbar/Navbar";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




export default function Projects() {
  return (
    <>
     <BootstrapNavbar />
      <h1>Projects Page Display all Projects</h1>
      
      <div>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>Project 1</Item>
        <Item>Project 2</Item>
        <Item>Project 3</Item>
      </Stack>
    </div>


    </>
    
  );
}
