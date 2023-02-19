import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Alert, AlertTitle, Backdrop, Box, Button, Container, Fab, FormControl, FormControlLabel,
    FormLabel, Grid, Modal, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, TextField, Typography
} from "@mui/material";


import backend from "@/comps/config";
import axios from "axios";
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

interface Student {
    student_id: string,
    student_name: string;
    gender: string;
    contact_number: string;
    address: string;
    dob: Date;
    admission_date: Date;
    graduation_date: Date;
    current_grade: string;
    guardian_name: string;
    guardian_contact: string;
    edit_std: string;
    delete_std: string;
}

interface Achievement {
    achievement_id: string;
    student_id: string;
    achievement_date: Date;
    description: string;
    edit_ach: string;
    delete_ach: string;
}

//create page for display student details with their achivements
//in the same page write code for add/update or delete  achivement for student using model popup
const Info = () => {
    const router = useRouter();
    const { id } = router.query as any;
    const carry_stuid = parseInt(id);
    console.log(carry_stuid)
    const [student, setStudent] = useState<Student[]>([])

    const getStudent = async () => {
        const res = await axios.get("http://35.192.153.99:5000/api/students/10000");
        const row = res.data;
        setStudent(
            {
                student_id: row.studentId,
                student_name: row.studentName,
                gender: row.gender,
                contact_number: row.contactNumber,
                address: row.address,
                dob: row.dob,
                admission_date: row.admissionDate,
                graduation_date: row.graduationDate,
                current_grade: row.currentGrade,
                guardian_name: row.guardianName,
                guardian_contact: row.guardianContact
            }
        );
    }
    const [rows, setRows] = useState<Achievement[]>([])
    const getAchievement = async () => {
        const res = await axios.get("http://35.192.153.99:5000/api/Achievement/GetAchievementByStudent/10001");
        const data = res.data.map((row: Achievement) => {
            return {
                achievement_id: row.achievementId,
                student_id: row.studentId,
                achievement_date: row.achievementDate,
                description: row.description,
                edit_ach: <BorderColorIcon />,
                delete_ach: <DeleteForeverIcon />
            }
        })
        setRows(data);
    }
    const [add, setAdd] = useState(false);
    const handleAdd = () => {
        setAdd(true);
    }
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [update, setUpdate] = useState(false);
    const handleUpdate = () => {
        setUpdate(true);
    }
    const handleClose = () => {
        setUpdate(false);
        setAdd(false);
    };

    const updateAchievement = async () => {

        const res = await axios.put(`${backend}api/achievement/${carry_stuid}`);
        if (res.status == 200) {
            setUpdate(false);
        }
    }

    const addAchievement = async () => {
        const res = await axios.post(`${backend}api/achievement/${carry_stuid}`);
        if (res.status == 200) {
            setAdd(false);
        }
    }

    const deteleAchievement = async () => {
        const res = await axios.delete(`${backend}api/achievement/${carry_stuid}`);
        if (res.status == 200) {
            console.log("deleted");
        }
    }

    React.useEffect(() => {
        getStudent();
        getAchievement();
    }, [])

    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="div" gutterBottom>
                            Student Details
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Student ID</TableCell>
                                        <TableCell align="right">{student.student_id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Student Name</TableCell>
                                        <TableCell align="right">{student.student_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Gender</TableCell>
                                        <TableCell align="right">{student.gender}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Contact Number</TableCell>
                                        <TableCell align="right">{student.contactNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell align="right">{student.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Date of Birth</TableCell>
                                        <TableCell align="right">{student.dob}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Current Grade</TableCell>
                                        <TableCell align="right">{student.current_grade}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="div" gutterBottom>
                            Student Achivements
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Achievement ID</TableCell>
                                        <TableCell align="right">Achievement Date</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                        <TableCell align="right">Edit</TableCell>
                                        <TableCell align="right">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.achievement_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.achievement_id}
                                            </TableCell>
                                            <TableCell align="right">{row.achievement_date}</TableCell>
                                            <TableCell align="right">{row.description}</TableCell>
                                            <TableCell align="right" onClick={handleUpdate}>{row.edit_ach}</TableCell>
                                            <TableCell align="right" onClick={handleDelete}>{row.delete_ach}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <Fab color="primary" aria-label="add" onClick={handleAdd}>
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Container>
            {add &&
                <Modal
                    open={add}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Achievement
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        defaultValue=""
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="date"
                                        label="Achievement Date"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton
                                        loadingPosition="start"
                                        startIcon={<SaveIcon />}
                                        variant="contained"
                                        onClick={addAchievement}
                                    >
                                        Save
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Typography>
                    </Box>
                </Modal>
            }
            {update &&
                <Modal
                    open={handleUpdate}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Update Achievement
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        defaultValue=""
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="date"
                                        label="Achievement Date"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton
                                        loadingPosition="start"
                                        startIcon={<SaveIcon />}
                                        variant="contained"
                                        onClick={updateAchievement}
                                    >
                                        Save
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Typography>
                    </Box>
                </Modal>
            }
        </>
    );
}

export default Info;