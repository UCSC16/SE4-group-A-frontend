import { Inter } from "@next/font/google";
import Head from "next/head";
import Button from '@mui/material/Button';
import { Box, Checkbox, Container, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [age, setAge] = useState('0');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <>
            <Head>
                <title>Student Manager</title>
                <meta name="description" content="Student Manager app" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Box p={3}>
                    <h1 className="text-3xl font-bold underline">Hello world!</h1>
                    <Button variant="contained">Hello World</Button>
                    <Button variant="text">Text</Button>
                    <Button variant="contained">Contained</Button>
                    <Button variant="outlined">Outlined</Button>
                </Box>
                <Box p={3}>
                    <Checkbox {...label} defaultChecked />
                    <Checkbox {...label} defaultChecked color="secondary" />
                    <Checkbox {...label} defaultChecked color="success" />
                    <Checkbox {...label} defaultChecked color="default" />

                </Box>
                <Box p={3} mt={3} className="">
                    <hr />
                    <h2>Use these elements to build forms</h2>
                    <Paper elevation={3} >
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">DropDown</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>

                        </FormControl>
                        <TextField
                            sx={{ m: 1 }}
                            label="Text Field"
                            id="outlined-size-small"
                            defaultValue="Hello I'm default value"
                            size="small"
                        />
                    </Paper>
                    <Box mt={3} sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid xs={8}>
                                <Paper>xs=8</Paper>
                            </Grid>
                            <Grid xs={4}>
                                <Paper>xs=4</Paper>
                            </Grid>
                            <Grid xs={4}>
                                <Paper>xs=4</Paper>
                            </Grid>
                            <Grid xs={8}>
                                <Paper>xs=8</Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </main>
        </>
    );
}
