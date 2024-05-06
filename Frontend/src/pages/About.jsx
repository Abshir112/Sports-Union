import { Container, Typography, Box, Grid } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, p: 3, backgroundColor: "#eedbc4" }}>
      <Typography variant="h4" sx={{
        fontFamily: '"Volkhov", Arial, sans-serif',
        fontWeight: 'light',
        color: '#263238',
        mb: 4
      }}>
        About Us
      </Typography>  
      <Box sx={{
        textAlign: "center",
        p: 3,
      }}>
        <Typography variant="body1" sx={{
          fontFamily: '"Volkhov", Arial, sans-serif',
          fontWeight: 'light',
          color: '#263238',
          mb: 4,
        }}>
       Högskolan Kristianstad Sports Union, established approximately around 2009, was founded with a profound commitment to enhancing the extracurricular landscape for students. Recognizing the immense pressure that academic pursuits can impose, the Sports Union serves as a vital outlet for students to relieve stress, promote physical health, and foster a sense of community and well-being through sports.
Through the Sports Union, students have the unique opportunity to engage in a variety of athletic activities, thereby not only improving their physical fitness but also building healthy relationships with peers from diverse backgrounds. This initiative underscores the importance of balance between academic rigor and physical activity, aiming to nurture well-rounded individuals equipped to tackle both personal and professional challenges.

  </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <img
            src="../../../assets/medlems.jpg"
            alt="Sport activity"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{
            fontFamily: '"Volkhov", Arial, sans-serif',
            fontWeight: 'light',
            color: '#263238',
          }}>
            Högskolan Kristianstad Sports Union serves as a vital outlet for students to relieve stress...
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
          <Typography variant="body1" sx={{
            fontFamily: '"Volkhov", Arial, sans-serif',
            fontWeight: 'light',
            color: '#263238',
          }}>
            Through the Sports Union, students engage in a variety of athletic activities...
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
          <img
            src="../../../assets/HKRSPORTEVENT.jpg"
            alt="Community gathering"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
