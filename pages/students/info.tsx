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

const Info = () => {
    const router = useRouter();
    //set student id to a variable
    const carry_stuid = router.query.id as string || "10000";
    const [student, setStudent] = useState<Student>(
        {
            student_id: "",
            student_name: "",
            gender: "",
            contact_number: "",
            address: "",
            dob: new Date(),
            admission_date: new Date(),
            graduation_date: new Date(),
            current_grade: "",
            guardian_name: "",
            guardian_contact: "",
            edit_std: "",
            delete_std: ""
        }
    );
    const getDatestring = (data: any) => {
        try {
            if (data == null) return null;
            const date = new Date(data);
            return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    
        } catch (error) {
            return null
    
        }
    }
    const [arcid, setArcid] = useState("");
    const [current_ach, setCurrent_ach] = useState<Achievement>({
        achievement_id: "",
        student_id: "",
        achievement_date: new Date(),
        description: "",
        edit_ach: "",
        delete_ach: ""
    });
    const getStudent = async () => {
        const res = await axios.get(`${backend}/api/students/${carry_stuid}`);
        const row = res.data;

        setStudent(
            {
                student_id:carry_stuid,
                student_name: row.studentName,
                gender: row.gender,
                contact_number: row.contactNumber,
                address: row.address,
                dob: row.dob,
                admission_date: row.admissionDate,
                graduation_date: row.graduationDate,
                current_grade: row.currentGrade,
                guardian_name: row.guardianName,
                guardian_contact: row.guardianContact,
                edit_std: "",
                delete_std: ""
            }
        );
    }
    const [rows, setRows] = useState<Achievement[]>([])
    const getAchievements = async () => {
        const res = await axios.get(`${backend}/api/Achievement/GetAchievementByStudent/${carry_stuid}`);
        const data = res.data.map((row: { achievementId: any; studentId: any; achievementDate: any; description: any; }) => {
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

    const getAchievementById = async (id: string) => {
        const res = await axios.get(`${backend}/api/Achievement/${id}`);
        const row = res.data;
        setCurrent_ach({
            achievement_id: row.achievementId,
            student_id: row.studentId,
            achievement_date: row.achievementDate,
            description: row.description,
            edit_ach: "",
            delete_ach: ""
        })
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

    const calculateAge = (birthday: Date) => { // birthday is a date
        const bday = new Date(birthday)
        const ageDifMs = Date.now() - bday.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const readDate = (date:Date) => {
        const mydate = new Date(date);
        return mydate;
    }
    const updateAchievement = async () => {
        const data = {
            achievementId: arcid,
            studentId: carry_stuid,
            achievementDate: current_ach.achievement_date,
            description: current_ach.description
        }
        console.log(data);
        const res = await axios.put(`${backend}/api/Achievement/${arcid}`, data);
        if (res.status == 204) {
            await getAchievements();
            setUpdate(false);
        }
    }

    const addAchievement = async () => {
        const data = {
            achievementId: "ACH" + Math.random().toString(36).substr(2, 9),
            studentId: carry_stuid,
            achievementDate: current_ach.achievement_date,
            description: current_ach.description
        }
        console.log(data);

        const res = await axios.post(`${backend}/api/Achievement`, data);

        if (res.status == 201) {
            await getAchievements();
            setAdd(false);
        }
    }

    const deleteAchievement = async (id: string) => {
        let confirmResult = window.confirm("Are you sure you want to delete this achievement?");
        if (!confirmResult) return;
        const res = await axios.delete(`${backend}/api/Achievement/${id}`);
        if (res.status == 204) {
            await getAchievements();
            console.log("deleted");
        }
    }

    React.useEffect(() => {
        getStudent();
        getAchievements();
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
                                        <TableCell align="right">{student.contact_number}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell align="right">{student.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Age</TableCell>
                                        <TableCell align="right">{calculateAge(student.dob)}</TableCell>
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
                            Student Achievements
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
                                            <TableCell align="right">{readDate(row.achievement_date).toDateString()}</TableCell>
                                            <TableCell align="right">{row.description}</TableCell>
                                            <TableCell align="right" onClick={
                                                async (e) => {
                                                    await getAchievementById(row.achievement_id.toString());
                                                    setUpdate(true);
                                                    setArcid(row.achievement_id.toString());
                                                    
                                                }

                                            }>{row.edit_ach}</TableCell>
                                            <TableCell align="right" onClick={
                                                async (e) => {
                                                    //pass id and delete the particular achivement

                                                    setArcid(row.achievement_id.toString());
                                                    await deleteAchievement(row.achievement_id.toString());

                                                }
                                                }
                                            >{row.delete_ach}</TableCell>
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
                                        onChange={ (e) => { setCurrent_ach({ ...current_ach, description: e.target.value }) }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="date"
                                        label="Achievement Date"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={ (e) => { setCurrent_ach({ ...current_ach, achievement_date: new Date(e.target.value) }) }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton
                                        loadingPosition="start"
                                        startIcon={<SaveIcon />}
                                        variant="contained"
                                        onClick={(e) => {
                                            addAchievement();
                                            setAdd(false);
                                        }
                                        }
                                    >
                                        Save
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Typography>
                    </Box>
                </Modal>
            }
            { update &&
            <Modal
                open={update}
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
                                    value={current_ach.description}
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={ (e) => { setCurrent_ach({ ...current_ach, description: e.target.value }) }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="date"
                                    label="Achievement Date"
                                    value={getDatestring(current_ach.achievement_date)}
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    onChange={ (e) => { setCurrent_ach({ ...current_ach, achievement_date:new Date(e.target.value) }) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    loadingPosition="start"
                                    startIcon={<SaveIcon />}
                                    variant="contained"
                                    onClick={
                                        (e) => {
                                            updateAchievement();
                                            setUpdate(false);
                                            }
                                        }
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