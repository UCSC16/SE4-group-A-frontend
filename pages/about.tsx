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
                        <p className={styles.text}>The Deaf and Blind School in Ratmalana, Sri Lanka is a unique
                            educational institution dedicated to providing high-quality education to
                            students with hearing and visual impairments. Established in 1912, the
                            school has a long history of serving the local community and has helped
                            countless students overcome the challenges associated with their
                            disabilities.</p>
                        <p className={styles.text}>The school&apos;s curriculum is specifically designed to meet the unique
                            needs of its students, with a focus on developing communication skills,
                            independence, and self-confidence. The faculty consists of highly
                            trained and experienced educators who are passionate about helping their
                            students reach their full potential.</p>
                        <p className={styles.text}>The school&apos;s facilities are state-of-the-art, with specialized equipment
                            and resources to support the learning needs of students with hearing and
                            visual impairments. In addition to traditional classrooms, the school
                            also offers specialized labs and workshops, as well as recreational
                            facilities for students to engage in extracurricular activities.</p>
                        <p className={styles.text}>At the Deaf and Blind School, students are provided with a safe and
                            supportive learning environment that fosters academic achievement and
                            personal growth. The school&apos;s commitment to excellence has earned it a
                            reputation as one of the leading institutions of its kind in Sri Lanka,
                            and it continues to be a beacon of hope for students and families
                            affected by hearing and visual impairments.</p>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default About;
