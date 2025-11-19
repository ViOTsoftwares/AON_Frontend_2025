import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import bgabout from "../assets/bgabout.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ContactusForm from "../components/ContactusForm";
import { useEffect } from "react";
function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  }, []);
  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        <Stack spacing={4} sx={{ py: { xs: 5, sm: 4 } }}>
          <Typography
            component="h1"
            textAlign="center"
            sx={{
              fontSize: {
                xs: "3rem",
                sm: "4rem",
                fontWeight: 700,
                lineHeight: { xs: "3rem", sm: "3.8rem" },
                p: { xs: "4rem 1rem", md: "4rem 0px" },
              },
            }}
          >
            About us
          </Typography>
          <Stack justifyContent="center" alignContent="center">
            <Typography
              sx={{
                lineHeight: "2rem",
                fontSize: "20px",
                fontWeight: 400,
              }}
            >
              SeedLegals is the UK market standard for companies raising
              investment, incentivising teams with share options, applying for
              SEIS/EIS, and managing their cap table. With 1 in 3 early-stage
              funding rounds closed on SeedLegals, and more cap tables and EMI
              option schemes set up and managed on SeedLegals than on any other
              platform in the UK, we're proud that we've transformed the way
              companies start, grow and scale.
            </Typography>
          </Stack>
        </Stack>
        <Grid container spacing={4}>
          <div
            style={{
              backgroundImage: `url(${bgabout})`,
              width: "100%",
              height: "700px",
              backgroundPosition: "center  center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              sx={{
                fontSize: { xs: "1.7777777778rem", sm: "2.4444444444rem" },
                lineHeight: { xs: 1.2, sm: "3rem" },
              }}
            >
              Our story
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                lineHeight: "1.8rem",
                fontSize: "20px",
                // lineHeight: 1.45,
              }}
            >
              SeedLegals was founded by serial entrepreneur Anthony Rose and
              serial angel investor Laurent Laffy who met at a party in Rome.
              They'd both had enough of paying insane amounts of money to
              lawyers for the same legal documents at every funding round, and
              funding rounds taking months to negotiate and close. They decided
              to change it. Fast forward six months and SeedLegals launched in
              2016 as the world’s first platform that lets founders and
              investors easily create, negotiate and sign all the legal
              agreements they need to do a funding round. We close more funding
              rounds in the UK than anyone else. We operate in the UK, US,
              Ireland & France and employ 160 brilliant people.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h5">
              Please Inset Here Any Image about Company
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "2rem", sm: "4rem" },
            fontWeight: 400,
            lineHeight: { xs: "2.1rem", sm: "4.1rem" },
            mt: "72px",
            mb: "34px",
            textAlign: "center",
          }}
        >
          Get in touch with Arun Office Needs
        </Typography>
        <Grid container>
          <Grid
            size={{ xs: 12, sm: 8 }}
            sx={{ height: { xs: "328px", sm: "480px" } }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d62885.97386678456!2d78.10892268540438!3d9.902828645372765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3b00c584051e4e03%3A0x1e93c7a5d6f0876a!2sArun%20Office%20Needs%2C%20Sourashtra%20Teachers%20Colony%20Main%20Road%2C%20Sourastra%20Teachers%20Colony%2C%20Tamil%20Nadu!3m2!1d9.9027466!2d78.1501229!4m5!1s0x3b00c584051e4e03%3A0x1e93c7a5d6f0876a!2s4%2F393%2C%20Sourashtra%20Teachers%20Colony%20Main%20Rd%2C%20Sourastra%20Teachers%20Colony%2C%20Babu%20Nagar%2C%20Tamil%20Nadu%20625009!3m2!1d9.9027466!2d78.1501229!5e0!3m2!1sen!2sin!4v1758191055170!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "1rem" }}
              allowFullScreen=""
              loading="lazy"
              // referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 4 }}
            sx={{ p: { xs: "1.3rem", sm: "2rem" } }}
          >
            <ContactusForm />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutUs;
