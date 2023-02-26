import { Grid, Paper } from "@mui/material";
import styles from '@/styles/Home.module.scss';


const About = () => {
    return (
        <Grid xs={12} sx={{ padding: '10px' }}>
            <Paper className={styles.panel} sx={{ padding: '1px 30px', borderRadius: '15px', height: '100%' }}>
                <Grid container>
                    <Grid xs={4} sx={{ padding: '10px' }}>
                        <p className={styles.htext}>About</p>
                    </Grid>
                    <Grid xs={8} sx={{ padding: '10px' }}>
                        <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi impedit suscipit architecto, odio inventore nostrum non neque dicta. Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem nobis odit.</p>
                        <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi impedit suscipit architecto, odio inventore nostrum non neque dicta. Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem nobis odit.</p>
                        <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi impedit suscipit architecto, odio inventore nostrum non neque dicta. Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem nobis odit.</p>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default About;