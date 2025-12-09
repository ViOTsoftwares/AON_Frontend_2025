import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import bgabout from "../assets/bgabout.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ContactusForm from "../components/ContactusForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  }, []);
  const { cmsDate } = useSelector((state) => state.CmsState);
  
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
             {cmsDate?.title}
            <h5 justifyContent="center">Our Brand Story</h5>          </Typography>
          <Stack justifyContent="center" alignContent="center">
            <Typography
              sx={{
                lineHeight: "2rem",
                fontSize: "20px",
                fontWeight: 400,
              }}
            > <b justifyContent>A Journey That Began with Just ₹300 (1988)</b>
               <Typography>Arun Office Needs started in 1988 with nothing more than a visiting card, a business card, and a letter pad worth ₹300. With a single catalogue in hand, I used to visit customers, show them chair and sofa models, explain the prices, take orders, and personally supply the products.
              My first major customers were banks. Before becoming a supplier, I was a consumer myself — that experience helped me understand exactly what customers expect.
              I rented my first office for ₹500 per month and worked there for nearly three years. I was just 25 years old when this journey began.
               </Typography>
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
              Early Stage
            </Typography>
           <Typography
  sx={{
    fontWeight: 400,
    lineHeight: "1.8rem",
    fontSize: "20px",
  }}
>
  In the early years, I supplied furniture to:
</Typography>

<Grid
  container
  direction="column"
  sx={{
    fontWeight: 400,
    lineHeight: "1.8rem",
    fontSize: "20px",
    justifyContent: "center",
    pl: 4, // indent list
  }}
>
  <ul style={{ margin: 0 }}>
    <li>Banks</li>
    <li>Railways</li>
    <li>Post offices</li>
    <li>Numerous private mills</li>
  </ul>
</Grid>

<Typography
  sx={{
    fontWeight: 400,
    lineHeight: "1.8rem",
    fontSize: "20px",
    mt: 2,
  }}
>
  I handled Ramco Rajamala’s 28 units, Thiyagaraja Mills, Thiyagaraja College, 
  and many other institutions. Step by step, the business grew — and in 1994, 
  I opened my first factory, which continues to run successfully to this day.
  <br /><br />
  Today, AON supplies furniture all over Tamil Nadu to State Bank, Central Bank, 
  Indian Bank, Overseas Bank, government offices, private companies, and spinning mills.
  <br /><br />
  My two sons have now joined the business — Subash (MBA) manages government-sector 
  orders from Chennai, and Varin (B.E) oversees operations here.
</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h5">
              Please Inset Here Any Image about Company
            </Typography>
          </Grid>
        </Grid>
      </Grid>


<Grid size={{ xs: 12, sm: 6 }}>
  <Typography variant="h5" justifyContent={"flex-start"} >
  <div justifyContent="center"
            style={{
              backgroundImage: `url(${bgabout})`,
              width: "50%",
              height: "700px",
              backgroundPosition: "center  center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div></Typography>
</Grid>

<Grid size={{ xs: 12, sm: 6 }}>
  <Typography
    sx={{
      fontSize: { xs: "1.7777777778rem", sm: "2.4444444444rem" },
      lineHeight: { xs: 1.2, sm: "3rem" },
    }}
  >
   Products & Works
  </Typography>

  <Typography
    sx={{
      fontWeight: 400,
      lineHeight: "1.8rem",
      fontSize: "20px",
    }}
  >
    In the early years, I supplied furniture to:
  </Typography>



  <Typography
    sx={{
      fontWeight: 400,
      lineHeight: "1.8rem",
      fontSize: "20px",
      mt: 2,
    }}
  >
          In the beginning, I worked alone. Two years later, I hired staff as orders grew. Managing family responsibilities and business simultaneously was challenging, but dedication kept me going.
          My father ran a small tea shop. We weren’t financially strong, yet my mother supported me whenever she could — even ₹5,000 was a huge amount back then.
          I once dreamt of starting a British-style biscuit shop, but the investment required (₹25–30 lakhs) was impossible. Life took me into the medical field for a short time, where I learned valuable lessons from Shri Sethuraman, a mentor who played a major role in shaping my business discipline.

     <br /><br />
    Today, AON supplies furniture all over Tamil Nadu to State Bank, Central
    Bank, Indian Bank, Overseas Bank, government offices, private companies, and
    spinning mills.
    <br /><br />
    My two sons have now joined the business — Subash (MBA) manages
    government-sector orders from Chennai, and Varin (B.E) oversees operations
    here.
  </Typography>
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
              allowFlilScreen=""
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
