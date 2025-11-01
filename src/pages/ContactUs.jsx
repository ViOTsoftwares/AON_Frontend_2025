import React from "react";
import contextImage from "../assets/context2.jpg";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import Form from "../components/Form";

function ContactUs() {
  return (
    <div>
     
 

 
      {/* <Container sx={{ mt: 5, mb: 10 }}>
        <Grid container spacing={1}>
          <Grid container size={{ xs: 12, sm: 6, md: 6 }}>
            <Box>
              <Typography>
                Have a query, need assistance, or looking for custom office
                solutions? We’re here to help! Whether you're designing a new
                workspace or upgrading an existing one, our team is ready to
                guide you every step of the way. Reach out via the details
                below, and we’ll ensure your experience with AON is smooth,
                timely, and tailored to your needs.
              </Typography>
              <Chip icon={<FaLocationDot />} label="Address" />
              <Typography color=" #726d6dff">
                {" "}
                AON – Arun Office Needs [Insert Street Name, Area] [City,
                State, PIN Code]
              </Typography>
              <Chip icon={<FaPhoneAlt />} label="Phone" />
              <Typography color=" #726d6dff"> 9595959595</Typography>
              <Chip icon={<MdEmail />} label="Phone" />
              <Typography color=" #726d6dff">abc@gmail.com</Typography>
              <Chip icon={<FaRegClock />} label="Working Hours" />
              <Typography color=" #726d6dff">
                Monday - Saturday:9:00 AM to 7:00 PM
              </Typography>
              <Typography color=" #726d6dff">Sunday: Close</Typography>
            </Box>
          </Grid>

          <Grid
            container
            size={{ xs: 12, sm: 6, md: 6 }}
            justifyContent="center"
          >
            <Form caption=" Get In Touch With Us" />
          </Grid>
        </Grid>
      </Container> */}
    </div>
  );
}

export default ContactUs;
