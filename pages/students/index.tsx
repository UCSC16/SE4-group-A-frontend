import {
    Alert, AlertTitle, Backdrop, Box, Button, Container, Fab, FormControl, FormControlLabel,
    FormLabel, Grid, Modal, RadioGroup, Radio, TextField, Typography, Card, Avatar
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigationIcon from '@mui/icons-material/Navigation';
import LoadingButton from '@mui/lab/LoadingButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from '@/pages/students/students.module.scss'

import backend from "@/comps/config";
import axios from "axios";
import React, { useRef, useState } from 'react';
import Link from "next/link";

interface Column {
    id: 'edit_std' | 'delete_std' | 'student_name' | 'gender' | 'contact_number' | 'address' | 'dob'
    | 'admission_date' | 'graduation_date' | 'current_grade' | 'guardian_name' | 'guardian_contact';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: Date) => string;
}
const getDatestring = (data: any) => {
    try {
        if (data == null) return null;
        const date = new Date(data);
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    } catch (error) {
        return null

    }
}
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

const columns: readonly Column[] = [
    { id: 'edit_std', label: '', minWidth: 30, align: 'right' },
    { id: 'delete_std', label: '', minWidth: 30, align: 'right' },
    { id: 'student_name', label: 'Name', minWidth: 100 },
    { id: 'gender', label: 'Gender', minWidth: 50 },
    { id: 'contact_number', label: 'Contact Number', minWidth: 100, align: 'right' },
    { id: 'address', label: 'Address', minWidth: 100, align: 'right' },
    { id: 'dob', label: 'DOB', minWidth: 100, align: 'right', format: (value: Date) => value.toLocaleString('en-US') },
    { id: 'admission_date', label: 'Admission Date', minWidth: 100, align: 'right', format: (value: Date) => value.toLocaleString('en-US') },
    { id: 'graduation_date', label: 'Graduation Date', minWidth: 100, align: 'right', format: (value: Date) => value.toLocaleString('en-US') },
    { id: 'current_grade', label: 'Current Grade', minWidth: 50, align: 'right' },
    { id: 'guardian_name', label: 'Guardian Name', minWidth: 100 },
    { id: 'guardian_contact', label: 'Guardian\'s Contact Number', minWidth: 100, align: 'right' },
];

function createStudentData(
    edit_std: string,
    delete_std: string,
    student_id: string,
    student_name: string,
    gender: string,
    contact_number: string,
    address: string,
    dob: Date,
    admission_date: Date,
    graduation_date: Date,
    current_grade: string,
    guardian_name: string,
    guardian_contact: string,
): Student {
    return {
        edit_std,
        delete_std,
        student_id,
        student_name,
        gender,
        contact_number,
        address,
        dob,
        admission_date,
        graduation_date,
        current_grade,
        guardian_name,
        guardian_contact,
    };
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const Students = () => {
    const [students, setStudents] = useState<Student[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedStudentId, setselectedStudentId] = useState('')
    const [selectedStudent, setselectedStudent] = useState({
        student_id: '',
        student_name: '',
        gender: '',
        contact_number: '',
        address: '',
        dob: new Date(),
        guardian_name: '',
        guardian_contact: '',
        admission_date: new Date(),
        graduation_date: new Date(),
        current_grade: '',
    })
    //random integer here ,
    const [newStudent, setNewStudent] = useState({
        student_id: Math.floor(Math.random() * 1000000000).toString(),
        student_name: '',
        gender: 'Male',
        contact_number: '',
        address: '',
        dob: new Date(),
        guardian_name: '',
        guardian_contact: '',
        admission_date: new Date(),
        graduation_date: new Date(),
        current_grade: '',
        showErr: false,
    })
    const [alertMsg, setalertMsg] = useState('')
    const [open, setOpen] = useState(false)
    const [deleteModalOpen, setdeleteModalOpen] = useState(false)
    const [editModalOpen, seteditModalOpen] = useState(false)
    const [alertVisible, setalertVisible] = useState(false)

    const rows = students.map((std) => createStudentData(
        "Edit student",
        "Delete student",
        std.student_id,
        std.student_name,
        std.gender,
        std.contact_number,
        std.address,
        std.dob,
        std.admission_date,
        std.graduation_date,
        std.current_grade,
        std.guardian_name,
        std.guardian_contact,
    ))

    // const fetchStudents = async () => {
    //   api call
    // state update
    // };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDobDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date: Date = new Date(event.target.value);
        setselectedStudent({ ...selectedStudent, dob: date })
    };
    const handleAdminDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date: Date = new Date(event.target.value);
        setselectedStudent({ ...selectedStudent, admission_date: date })
    };
    const handleGradDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date: Date = new Date(event.target.value);
        setselectedStudent({ ...selectedStudent, graduation_date: date })
    };
    const calculateAge = (birthday: Date) => { // birthday is a date
        const bday = new Date(birthday)
        const ageDifMs = Date.now() - bday.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const updateStudent = async () => {
        try {
            if (selectedStudent.student_name === '') {
                setalertVisible(true)
                setalertMsg('Student name cannot be empty')
                setTimeout(() => {
                    setalertVisible(false)
                }, 3000);
            }
            else if (selectedStudent.gender === '') {
                setalertVisible(true)
                setalertMsg('Student gender cannot be empty')
                setTimeout(() => {
                    setalertVisible(false)
                }, 3000);
            }
            else if (selectedStudent.contact_number === '') {
                setalertVisible(true)
                setalertMsg('Student contact number cannot be empty')
                setTimeout(() => {
                    setalertVisible(false)
                }, 3000);
            }
            else if (selectedStudent.address === '') {
                setalertVisible(true)
                setalertMsg('Student address cannot be empty')
                setTimeout(() => {
                    setalertVisible(false)
                }, 3000);
            }
            else if (!selectedStudent.dob) {
                setalertVisible(true)
                setalertMsg('Student date of birth cannot be empty')
                setTimeout(() => {
                    setalertVisible(false)
                }, 3000);
            }
            else if (!selectedStudent.admission_date) {
                setalertVisible(true)
                setalertMsg('Student admission date cannot be empty')
                setTimeout(() => {
                    setalertVisible(false)
                }, 3000);
            }
            else if (selectedStudent.current_grade === '') {
                setalertVisible(true)
                setalertMsg('Student current grade cannot be empty')
                setTimeout(() => {
                    setalertVisible(false)
                }, 3000);
            }
            else {
                let tempDob = new Date(selectedStudent.dob)
                let updatedDob = new Date(tempDob.getTime() - (tempDob.getTimezoneOffset() * 60000)).toISOString()
                let tempAdm = new Date(selectedStudent.admission_date)
                let updatedAdm = new Date(tempAdm.getTime() - (tempAdm.getTimezoneOffset() * 60000)).toISOString()
                let updatedGrad = null;
                if (selectedStudent.graduation_date) {
                    let tempGrad = new Date(selectedStudent.graduation_date);
                    updatedGrad = new Date(tempGrad.getTime() - (tempGrad.getTimezoneOffset() * 60000)).toISOString();
                }
                const datat = {
                    "studentId": selectedStudent.student_id,
                    "studentName": selectedStudent.student_name,
                    "gender": selectedStudent.gender,
                    "contactNumber": selectedStudent.contact_number,
                    "address": selectedStudent.address,
                    "dob": updatedDob,
                    "guardianName": selectedStudent.guardian_name,
                    "guardianContact": selectedStudent.guardian_contact,
                    "admissionDate": updatedAdm,
                    "graduationDate": updatedGrad,
                    "currentGrade": selectedStudent.current_grade,
                    // "student": selectedStudent
                }
                const response = await axios.put(`${backend}/api/Students/${selectedStudent.student_id}`, datat)
                // students.map((student) => {
                //     if (student.student_id === selectedStudent.student_id) {
                //         student.student_id = selectedStudent.student_id,
                //             student.student_name = selectedStudent.student_name,
                //             student.gender = selectedStudent.gender,
                //             student.contact_number = selectedStudent.contact_number,
                //             student.address = selectedStudent.address,
                //             student.dob = selectedStudent.dob,
                //             student.admission_date = selectedStudent.admission_date,
                //             student.graduation_date = selectedStudent.graduation_date,
                //             student.current_grade = selectedStudent.current_grade,
                //             student.guardian_name = selectedStudent.guardian_name,
                //             student.guardian_contact = selectedStudent.guardian_contact
                //     }
                // })
                alert('Data submitted successfully');
                getStudents()
                seteditModalOpen(false)
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while submitting the data');
        }
    }

    const removeStudent = async () => {
        try {
            const response = await axios.delete(`${backend}/api/Students/${selectedStudentId}`)
            getStudents()
        }
        catch (error) {
            console.error(error);
            alert('An error occurred while submitting the data');
        }

        setdeleteModalOpen(false)
    }

    const newName = useRef(null);

    const createStudent = () => {
        setNewStudent({ ...newStudent, showErr: false })
        //validation
        if (newStudent.student_name === '') {
            setNewStudent({ ...newStudent, showErr: true })
        }
        else if (newStudent.gender === '') {
            setNewStudent({ ...newStudent, showErr: true })
            console.log(newStudent.gender)
        }
        else if (newStudent.contact_number === '') {
            setNewStudent({ ...newStudent, showErr: true })
        }
        else if (newStudent.address === '') {
            setNewStudent({ ...newStudent, showErr: true })
        }
        else if (newStudent.current_grade === '') {
            setNewStudent({ ...newStudent, showErr: true })
        } else {
            //create student
            console.log(newStudent)
            const tempstudent = {
                studentId: newStudent.student_id,
                studentName: newStudent.student_name,
                gender: newStudent.gender,
                contactNumber: newStudent.contact_number,
                address: newStudent.address,
                dob: newStudent.dob.toISOString(),
                guardianName: newStudent.guardian_name,
                guardianContact: newStudent.guardian_contact,
                admissionDate: newStudent.admission_date.toISOString(),
                graduationDate: newStudent.graduation_date.toISOString(),
                currentGrade: newStudent.current_grade,
            }
            console.log(tempstudent)
            console.log(tempstudent.dob.toString())
            console.log(tempstudent.admissionDate)

            axios.post(backend + '/api/students', tempstudent).then(async (res) => {
                console.log(res);
                await getStudents();
                handleClose();
            }).catch((err) => {
                console.log(err);
            })

        }

    }

    const getStudents = async () => {
        const res = await axios.get(backend + '/api/Students');
        const data = res.data.map((student: any) => {
            return {
                student_id: student.studentId,
                student_name: student.studentName,
                gender: student.gender,
                contact_number: student.contactNumber,
                address: student.address,
                dob: Date.parse(student.dob),
                guardian_name: student.guardianName,
                guardian_contact: student.guardianContact,
                admission_date: Date.parse(student.admissionDate),
                graduation_date: student.graduationDate ? Date.parse(student.graduationDate) : null,
                current_grade: student.currentGrade,
            };
        })

        console.log(res.data)
        setStudents(data);
    }

    React.useEffect(() => {
        getStudents();
    }, [])



    return (
        <div>
            <h1>All Students</h1>

            <Box>
                <Grid container /* spacing={1} */>
                    {rows.map((row, index) => {
                        return (
                            <Grid item xs={4} p={1} key={index}>
                                <Card className={styles.card} sx={{ textAlign: 'center' }}>
                                    <h2>{row.student_name}</h2>
                                    <Box sx={{ display: "flex", justifyContent: 'center' }}>
                                        <Avatar sx={{ width: 70, height: 70 }} alt={row.student_name || 'Student Name'} src="/static/images/avatar/1.jpg" />
                                    </Box>
                                    <p>{row.contact_number}</p>
                                    <p>{row.gender}</p>
                                    <p>{"Age : " + calculateAge(row.dob)}</p>
                                    <p>{"Grade : " + row.current_grade}</p>
                                    <Box sx={{ '& > :not(style)': { m: 1 } }} mb={2} >
                                        <Link href={`students/info?id=${row.student_id}`}>
                                            <Fab size="medium" variant="extended" color="secondary" aria-label="more">
                                                <NavigationIcon sx={{ mr: 1 }} />
                                                Show More
                                            </Fab>
                                        </Link>
                                        <Fab size="small" color="info" aria-label="edit" onClick={(e) => {
                                            seteditModalOpen(true)
                                            setselectedStudentId(row.student_id)
                                            setselectedStudent({
                                                student_id: row.student_id,
                                                student_name: row.student_name,
                                                gender: row.gender,
                                                contact_number: row.contact_number,
                                                address: row.address,
                                                dob: row.dob,
                                                admission_date: row.admission_date,
                                                graduation_date: row.graduation_date,
                                                current_grade: row.current_grade,
                                                guardian_name: row.guardian_name,
                                                guardian_contact: row.guardian_contact,
                                            })
                                        }}>
                                            <EditIcon />
                                        </Fab>
                                        <Fab size="small" color="error" aria-label="delete" onClick={() => {
                                            setdeleteModalOpen(true)
                                            setselectedStudentId(row.student_id)
                                        }}>
                                            <DeleteIcon />
                                        </Fab>
                                    </Box>
                                </Card>
                            </Grid>
                        );
                    })}



                </Grid>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Fab className={styles.floatBtn} onClick={handleOpen} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={styles.panel}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Create a new student profile
                    </Typography>
                    <Box component={Container} id="modal-modal-description" sx={{ mt: 1, px: 0 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}><p>Personal Information</p></Grid>
                            <Grid item md={8}>
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Name"
                                    ref={newName}
                                    id="Name"
                                    size="small"
                                    error={newStudent.showErr && newStudent.student_name === ''}
                                    helperText={newStudent.showErr && newStudent.student_name === '' ? "Name Cannot Be Empty." : ''}
                                    onChange={(e) => { setNewStudent({ ...newStudent, student_name: e.target.value }) }}
                                />
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Contact Number"
                                    id="Contact-Number"
                                    size="small"
                                    error={newStudent.showErr && newStudent.contact_number === ''}
                                    helperText={newStudent.showErr && newStudent.contact_number === '' ? "Contact Number Cannot Be Empty." : ''}
                                    onChange={(e) => { setNewStudent({ ...newStudent, contact_number: e.target.value }) }}
                                />
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    size="small"
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => { setNewStudent({ ...newStudent, dob: new Date(e.target.value) }) }}
                                />
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Address"
                                    id="Address"
                                    size="small"
                                    multiline
                                    rows={3}
                                    error={newStudent.showErr && newStudent.address === ''}
                                    helperText={newStudent.showErr && newStudent.address === '' ? "Address Cannot Be Empty." : ''}
                                    onChange={(e) => { setNewStudent({ ...newStudent, address: e.target.value }) }}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="Male"
                                        name="radio-buttons-group"

                                        onChange={(e) => { setNewStudent({ ...newStudent, gender: e.target.value }) }}
                                    >
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </FormControl>
                                {alertVisible &&
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        {alertMsg}
                                    </Alert>
                                }
                            </Grid>
                            <Grid item md={8}>
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Guardian's Name"
                                    id="Name"
                                    size="small"
                                    error={newStudent.showErr && newStudent.guardian_name === ''}
                                    helperText={newStudent.showErr && newStudent.guardian_name === '' ? "Guardian's Name Cannot Be Empty." : ''}
                                    onChange={(e) => { setNewStudent({ ...newStudent, guardian_name: e.target.value }) }}
                                />
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Guardian's Contact Number"
                                    id="Contact-Number"
                                    size="small"
                                    error={newStudent.showErr && newStudent.guardian_contact === ''}
                                    helperText={newStudent.showErr && newStudent.guardian_contact === '' ? "Guardian's Contact Number Cannot Be Empty." : ''}
                                    onChange={(e) => { setNewStudent({ ...newStudent, guardian_contact: e.target.value }) }}
                                />

                            </Grid>
                            <Grid item md={4}>

                            </Grid>
                            <Grid item md={12}><p>Academic Information</p></Grid>
                            <Grid item md={8}>
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Admission Date"
                                    id="Admission"
                                    size="small"
                                    type={'date'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => { setNewStudent({ ...newStudent, admission_date: new Date(e.target.value) }) }}
                                />
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Graduation Date"
                                    id="Graduation"
                                    size="small"
                                    type={'date'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => { setNewStudent({ ...newStudent, graduation_date: new Date(e.target.value) }) }}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Grade"
                                    id="Grade"
                                    size="small"
                                    type={'number'}
                                    error={newStudent.showErr && newStudent.current_grade === ''}
                                    helperText={newStudent.showErr && newStudent.current_grade === '' ? "Grade Cannot Be Empty." : ''}
                                    onChange={(e) => { setNewStudent({ ...newStudent, current_grade: e.target.value }) }}
                                />
                            </Grid>
                            <Grid item md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                                <LoadingButton
                                    // size="small"
                                    color="secondary"
                                    onClick={createStudent}
                                    sx={{ marginRight: '7%' }}
                                    loading={false}
                                    loadingPosition="start"
                                    startIcon={<SaveIcon />}
                                    variant="contained"
                                >
                                    <span>Save</span>
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Modal>

            {deleteModalOpen &&
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={deleteModalOpen}
                    onClose={() => setdeleteModalOpen(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Box sx={style}  className={styles.panel}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Delete Student
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Are you absolutely sure that you want to delete the selected student?
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
                            <Button variant="contained" color="error" onClick={removeStudent}>Yes</Button>
                            <Button variant="contained" onClick={() => setdeleteModalOpen(false)}>No</Button>
                        </div>
                    </Box>
                </Modal>
            }

            {editModalOpen &&
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={editModalOpen}
                    onClose={() => seteditModalOpen(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Box sx={style} className={styles.panel}>
                        <Typography variant='h4' gutterBottom >
                            Update Details of {selectedStudent.student_name}
                        </Typography>

                        {alertVisible &&
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {alertMsg}
                            </Alert>
                        }

                        <Grid margin={2} container direction='column' width='30000' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                            <Box>
                                <TextField label='Name' value={selectedStudent.student_name} variant='outlined' style={{ width: '75%' }} onChange={(e) => { setselectedStudent({ ...selectedStudent, student_name: e.target.value }) }} />
                            </Box>
                            <Box marginTop={1}>
                                <TextField label='Gender' value={selectedStudent.gender} variant='outlined' style={{ width: '75%' }} onChange={(e) => { setselectedStudent({ ...selectedStudent, gender: e.target.value }) }} />
                            </Box>
                            <Box marginTop={1}>
                                <TextField label='Contact Number' value={selectedStudent.contact_number} variant='outlined' style={{ width: '75%' }} onChange={(e) => { setselectedStudent({ ...selectedStudent, contact_number: e.target.value }) }} />
                            </Box>
                            <Box marginTop={1}>
                                <TextField label='Address' value={selectedStudent.address} variant='outlined' style={{ width: '75%' }} onChange={(e) => { setselectedStudent({ ...selectedStudent, address: e.target.value }) }} />
                            </Box>
                            <Box marginTop={2}>
                                <TextField label='Date Of Birth' value={getDatestring(selectedStudent.dob)} type='date' InputLabelProps={{ shrink: true }} variant='outlined' style={{ width: '75%' }} onChange={handleDobDateChange} />
                            </Box>
                            <Box marginTop={1}>
                                <TextField label='Guardian Name' value={selectedStudent.guardian_name} variant='outlined' style={{ width: '75%' }} onChange={(e) => { setselectedStudent({ ...selectedStudent, guardian_name: e.target.value }) }} />
                            </Box>
                            <Box marginTop={1}>
                                <TextField label='Guardian Contact' value={selectedStudent.guardian_contact} variant='outlined' style={{ width: '75%' }} onChange={(e) => { setselectedStudent({ ...selectedStudent, guardian_contact: e.target.value }) }} />
                            </Box>
                            <Box marginTop={2}>
                                <TextField label='Admission Date' value={getDatestring(selectedStudent.admission_date)} type='date' InputLabelProps={{ shrink: true }} variant='outlined' style={{ width: '75%' }} onChange={handleAdminDateChange} />
                            </Box>
                            <Box marginTop={2}>
                                <TextField label='Graduation Date' value={getDatestring(selectedStudent.graduation_date)} type='date' InputLabelProps={{ shrink: true }} variant='outlined' style={{ width: '75%' }} onChange={handleGradDateChange} />
                            </Box>
                            <Box marginTop={1}>
                                <TextField label='Current Grade' value={selectedStudent.current_grade} variant='outlined' style={{ width: '75%' }} onChange={(e) => { setselectedStudent({ ...selectedStudent, current_grade: e.target.value }) }} />
                            </Box>
                        </Grid>
                        <Box marginTop={4} style={{ width: 'full', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Button variant='contained' type='submit' onClick={updateStudent}>
                                Save
                            </Button>
                            <Button variant='contained' type='submit' color='error' onClick={() => seteditModalOpen(false)}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            }
        </div >
    );
}

export default Students;