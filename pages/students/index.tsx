import { Box, Container, Modal, Typography, Fab, FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { useState } from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const Students = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <h1>All Students</h1>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Fab onClick={handleOpen} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Create a new student profile
                    </Typography>
                    <Box component={Container} id="modal-modal-description" sx={{ mt: 1, px: 0 }}>
                        <Grid container spacing={2}>
                            <Grid xs={12}><p>Personal Information</p></Grid>
                            <Grid xs={8}>
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Name"
                                    id="Name"
                                    size="small"
                                />
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Contact Number"
                                    id="Contact-Number"
                                    size="small"
                                />
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Address"
                                    id="Address"
                                    size="small"
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                            <Grid xs={4}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid xs={8}>
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Guardian's Name"
                                    id="Name"
                                    size="small"
                                />
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Guardian's Contact Number"
                                    id="Contact-Number"
                                    size="small"
                                />
                                
                            </Grid>
                            <Grid xs={4}>
                                
                            </Grid>
                            <Grid xs={12}><p>Acedemic Information</p></Grid>
                            <Grid xs={8}>
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Admission Date"
                                    id="Admission"
                                    size="small"
                                />
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Graduation Date"
                                    id="Graduation"
                                    size="small"
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    sx={{ mr: 2, mb: 1, width: '80%' }}
                                    label="Grade"
                                    id="Grade"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}

export default Students;