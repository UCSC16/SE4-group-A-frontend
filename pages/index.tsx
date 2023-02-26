import styles from '@/styles/Home.module.scss';
import { Box, Grid, Paper, SelectChangeEvent } from "@mui/material";
import { Inter } from "@next/font/google";
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

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={4}>
                    <Grid xs={8} sx={{ padding: '10px' }}>
                        <Paper className={styles.backdropTitle} sx={{ padding: '1px 30px', borderRadius: '15px' }}>
                            <p className={styles.heroText}>
                                Welcome to <br />
                                <span>Student <br />Manager<br /> Application   </span>
                                v1.0
                            </p>
                        </Paper>
                    </Grid>
                    <Grid container xs={4}>
                        <Box sx={{ padding: '10px' }}>
                            <a href="./students">
                                <Paper className={styles.btnPanel} sx={{ padding: '1px 30px', borderRadius: '15px', height: '100%' }}>
                                    <p className={styles.btnText}>
                                        View Students
                                    </p>
                                </Paper>
                            </a>
                        </Box>
                        <Grid xs={6} sx={{ padding: '10px' }}>
                            <Paper className={styles.infoPanel} sx={{ padding: '1px 30px', borderRadius: '15px', height: '100%' }}>
                                <p className={styles.info}>
                                    Student <br />
                                    Count
                                </p>
                                <p className={styles.value}>
                                    10
                                </p>
                            </Paper>
                        </Grid>
                        <Grid xs={6} sx={{ padding: '10px' }}>
                            <Paper className={styles.infoPanel} sx={{ padding: '1px 30px', borderRadius: '15px', height: '100%' }}>
                                <p className={styles.info}>
                                    Student <br />
                                    Count
                                </p>
                                <p className={styles.value}>
                                    10
                                </p>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid xs={12} sx={{ padding: '10px' }}>
                        <Paper className={styles.panel} sx={{ padding: '1px 30px', borderRadius: '15px', height: '100%' }}>
                        <Grid container>
                            <Grid xs={4} sx={{ padding: '10px' }}>
                                <p className={styles.htext}>Homepage</p>
                            </Grid>
                            <Grid xs={8} sx={{ padding: '10px' }}>
                            <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi impedit suscipit architecto, odio inventore nostrum non neque dicta. Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem nobis odit.</p>
                            <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi impedit suscipit architecto, odio inventore nostrum non neque dicta. Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem nobis odit.</p>
                            </Grid>
                        </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
