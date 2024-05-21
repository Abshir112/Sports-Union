import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material";

const teamMembers = [
  { name: "Ahmed Radwan", image: "https://i.ibb.co/r2YVZKT/ahmed.jpg", description: "Full Stack Developer with focus on System design, Back End, database management and Project management." },
  { name: "Mohamad Alloush", image: "https://i.ibb.co/qx7P8YK/alloush.jpg", description: "Full Stack Developer with main focus on Back End and database management." },
  { name: "Lakshmi Hayagrivan", image: "https://i.ibb.co/PYGCXh3/lakshmi.jpg", description: "Full Stack Developer with the main role of Project Designer, focus on Figma and Front End." },
  { name: "Jwan Mardini", image: "https://i.ibb.co/M6FcRsg/jwan.png", description: "Full Stack Developer with focus on Front End, Authentication, Material UI, Debugging and Testing " },
  { name: "Abshir Abdi", image: "https://i.ibb.co/VtLmrLD/Abshir.jpg", description: "Full Stack Developer with focus on Front End, Material UI, Resources management and debugging" }];

const About = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container component="main" maxWidth="lg" sx={{mt: 4, p: { xs: 2, sm: 3 }, backgroundColor: theme.palette.background.paper, borderRadius: "1%"}}>
      <Grid container spacing={2}>
        {/* Header Section */}
        <Grid item xs={12}>
          <Typography variant="h4" sx={{
            fontFamily: '"Volkhov", Arial, sans-serif',
            fontWeight: 'light',
            color: '#263238',
            mb: { xs: 1, sm: 2 },
            textAlign: 'center'
          }}>
            ABOUT US
          </Typography>
        </Grid>

        {/* Description Box */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", p: { xs: 1, sm: 3 } }}>
            <Typography variant="body1" sx={{
              fontFamily: '"Volkhov", Arial, sans-serif',
              fontWeight: 'light',
              color: '#101518',
              mb: { xs: 1, sm: 2 },
              borderRadius: '8px',
              p: { xs: 1, sm: 2 },
              textAlign: 'center'
            }}>
              Högskolan Kristianstad Sports Union, established approximately around 2009, was founded with a profound commitment to enhancing the extracurricular landscape for students. Recognizing the immense pressure that academic pursuits can impose, the Sports Union serves as a vital outlet for students to relieve stress, promote physical health, and foster a sense of community and well-being through sports.
            </Typography>
            <Typography variant="body1" sx={{
              fontFamily: '"Volkhov", Arial, sans-serif',
              fontWeight: 'light',
              color: '#101518',
              mb: { xs: 1, sm: 2 },
              borderRadius: '8px',
              p: { xs: 1, sm: 2 },
              textAlign: 'center',
            }}>
              Through the Sports Union, students have the unique opportunity to engage in a variety of athletic activities, thereby not only improving their physical fitness but also building healthy relationships with peers from diverse backgrounds.
            </Typography>
          </Box>
        </Grid>

        {/* Images and Text Layout */}
        <Grid container item spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <img
                src="https://i.ibb.co/BBgJYVB/medlems.jpg"
                alt="Sport activity"
                style={{
                  width: '80%',
                  maxWidth: '350px',
                  margin: '0 auto',
                  display: 'block'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <Typography variant="body1" sx={{
                fontFamily: '"Volkhov", Arial, sans-serif',
                fontWeight: 'light',
                color: '#EEDCB4',
                backgroundColor: '#101518',
                borderRadius: '8px',
                p: { xs: 1, sm: 2 },
                textAlign: 'center',
                marginRight: { xs: '0', md: '100px' }
              }}>
                Kristianstad University has an attractive campus that includes student housing and is easy to get around. The campus offers all the educational facilities you need, including classrooms, a library, a sports hall, a café, and a restaurant.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
            <Box sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <Typography variant="body1" sx={{
                fontFamily: '"Volkhov", Arial, sans-serif',
                fontWeight: 'light',
                color: '#EEDCB4',
                backgroundColor: '#101518',
                borderRadius: '8px',
                p: { xs: 1, sm: 2 },
                textAlign: 'center',
                marginTop: { xs: '20px', md: '80px' },
                marginLeft: { xs: '0', md: '80px' }
              }}>
                The university sports union arranges various sports activities at the campus almost every evening of the week. The student union's social committee organizes events like movie nights, language cafés, and special parties for students.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
            <Box sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <img
                src="https://i.ibb.co/5rPsLrp/even1.jpg"
                alt="Community gathering"
                style={{
                  width: '55%',
                  maxWidth: '400px',
                  margin: '0 auto',
                  display: 'block'
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Second Images and Text Layout */}
        <Grid container item spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <img
                src="https://i.ibb.co/PTVS5Rn/landingpage.png"
                alt="Sport activity"
                style={{
                  width: '80%',
                  maxWidth: '350px',
                  margin: '0 auto',
                  display: 'block'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <Typography variant="body1" sx={{
                fontFamily: '"Volkhov", Arial, sans-serif',
                fontWeight: 'light',
                color: '#EEDCB4',
                backgroundColor: '#101518',
                borderRadius: '8px',
                p: { xs: 1, sm: 2 },
                textAlign: 'center',
                paddingTop: '10px',
                marginRight: { xs: '0', md: '80px' }
              }}>
                Högskolan Kristianstad Sports Union serves as a vital outlet for students to relieve stress. Our diverse sports schedule caters to every enthusiast, from beginners to seasoned athletes.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
            <Box sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <Typography variant="body1" sx={{
                fontFamily: '"Volkhov", Arial, sans-serif',
                fontWeight: 'light',
                color: '#EEDCB4',
                backgroundColor: '#101518',
                borderRadius: '8px',
                p: { xs: 1, sm: 2 },
                textAlign: 'center',
                marginTop: '40px',
                paddingTop: '30px',
                marginLeft: { xs: '0', md: '80px' }
              }}>
                Through the Sports Union, students engage in various athletic activities, including padel, swimming, football, badminton, chess, yoga, and climbing.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
            <Box sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <img
                src="https://i.ibb.co/nfjX2tL/Hkrsports.jpg"
                alt="Community gathering"
                style={{
                  width: '80%',
                  maxWidth: '350px',
                  margin: '0 auto',
                  display: 'block'
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Our Team Section */}
        <Grid item xs={12}>
          <Typography variant="h4" sx={{
            fontFamily: '"Volkhov", Arial, sans-serif',
            fontWeight: 'light',
            color: '#263238',
            mb: { xs: 1, sm: 2 },
            textAlign: 'center'
          }}>
            CONTRIBUTORS <br /> (Tech Team)
          </Typography>
        </Grid>

        {/* Team Cards */}
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Card sx={{ borderRadius: '8px', backgroundColor: '#101518', color: '#EEDCB4' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={member.image}
                  alt={member.name}
                  sx={{objectFit: isSmall ? 'contain' : 'cover'}}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="#EEDCB4">
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
