import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import bgabout from "../assets/bgabout.jpg";
import AONFactory from "../assets/AON_Factory.png";
import AONFDR from "../assets/AON_FDR.jpg";
import AONFDR1 from "../assets/AON_FDR_1.jpg";
import AONBNR from "../assets/AON_HeroBanner.png";

import ContactusForm from "../components/ContactusForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ImageApi } from "../ImageApi";

function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { cmsDate } = useSelector((state) => state.CmsState);

  return (
    <Container maxWidth={false} sx={{ pt: 8, pb: 4 }}>
      {/* ================= HERO ================= */}
      {/* ===== H1 STAYS CENTERED ALONE ===== */}
      <Typography
        component="h1"
        textAlign="center"
        sx={{
          fontSize: { xs: "3rem", sm: "4rem" },
          fontWeight: 700,
          lineHeight: { xs: "3rem", sm: "3.8rem" },
          px: 2,
        }}
      >
        {cmsDate?.title}
        <h5>Trusted Office Furniture Manufacturer in Tamil Nadu Since 1988</h5>
      </Typography>

      {/* ===== PARAGRAPH + LOGO ROW ===== */}
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        {/* LEFT – STORY PARAGRAPH */}
        <Grid
          size={{ xs: 12, md: 8 }}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              lineHeight: "2rem",
              fontSize: "20px",
              fontWeight: 400,
              textAlign: "center",
              maxWidth: "900px",
              mx: "auto",
              px: 2,
            }}
          >
            <b>A Journey That Began with Belief & ₹300 (1988)</b>
            <br />
            <br />
            Founded in 1988, Arun Office Needs is a leading office furniture
            manufacturer based in Madurai, Tamil Nadu. The journey began with a
            visiting card, a letter pad, one catalogue, and an investment of
            just ₹300.
            <br />
            <br />
            At the age of 25, the founder personally met customers, explained
            office chair and sofa models, finalized pricing, took orders, and
            ensured delivery. Being a customer before becoming a supplier helped
            build a strong understanding of quality, durability, and customer
            expectations.
            <br />
            <br />A modest office rented for ₹500 per month served as the
            foundation for nearly three years. What began as a one-person effort
            laid the groundwork for a trusted institutional and government
            furniture supplier.
          </Typography>
        </Grid>

        {/* RIGHT – CMS LOGO */}
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
          }}
        >
          {cmsDate?.logo && (
            <Box
              component="img"
              src={`${ImageApi}/testimonial/` + cmsDate.logo}
              alt="Arun Office Needs Logo"
              loading="lazy"
              sx={{
                width: "100%",
                // maxWidth: "100%",
                height: "auto",
                cursor: "pointer",

                /* stroke + depth for transparent PNG */
                filter: `
      drop-shadow(1px 0 0 rgba(109, 3, 3, 0.65))
      drop-shadow(-1px 0 0 rgba(100, 0, 0, 0.35))
      drop-shadow(0 1px 0 rgba(0, 0, 0, 0.35))
      drop-shadow(0 -1px 0 rgba(0, 0, 0, 0.30))
    `,

                transition: "transform 0.25s ease, filter 0.25s ease",

                "&:hover": {
                  transform: "scale(1.03)",
                  filter: `
        drop-shadow(1px 0 0 rgba(0, 0, 0, 0.27))
        drop-shadow(-1px 0 0 rgba(0, 0, 0, 0.27))
        drop-shadow(0 6px 16px rgba(0, 0, 0, 0.21))
      `,
                },
              }}
            />
          )}
        </Grid>
      </Grid>

      {/* ================= HERO IMAGE ================= */}
      <Grid container>
        <Grid size={{ xs: 12 }} sx={{ pt: 2 }}>
          <div
            style={{
              backgroundImage: `url(${AONBNR})`,
              width: "100%",
              height: "450px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "auto",
            }}
          />
        </Grid>
      </Grid>

      {/* ================= EARLY STAGE ================= */}
      <Grid container spacing={4} sx={{ px: { xs: 2, md: 8 }, py: 6 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={{ fontSize: { xs: "1.8rem", sm: "2.3rem" }, mb: 2 }}>
            Early Stage – Growth Through Trust
          </Typography>

          <Typography
            sx={{ fontSize: "20px", lineHeight: "1.8rem", textAlign: "center" }}
          >
            The first major customers were banks, followed by railways, post
            offices, private mills, and educational institutions. Organizations
            such as Ramco Mills’ 28 units, Thiyagaraja Mills, and Thiyagaraja
            College placed their trust in Arun Office Needs.
            <br />
            <br />
            As demand increased, operations expanded steadily. In 1994, the
            company established its first furniture manufacturing factory in
            Madurai.
            <br />
            <br />
            Today, Arun Office Needs supplies office furniture across Tamil
            Nadu, serving State Bank, Central Bank, Indian Bank, Overseas Bank,
            government offices, spinning mills, and private companies.
          </Typography>
        </Grid>

        {/* Secondary Image 1 */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <div
            style={{
              backgroundImage: `url(${AONFDR1})`,
              width: "100%",
              height: "500px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />
        </Grid>
      </Grid>

      {/* ================= MANUFACTURING ================= */}
      <Grid container spacing={4} sx={{ px: { xs: 2, md: 8 }, pb: 6 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            sx={{
              fontSize: { xs: "1.8rem", sm: "2.4rem" },
              mb: 2,
              textAlign: "center",
            }}
          >
            Office Furniture Manufacturing Built for Long-Term Use
          </Typography>

          <Typography
            sx={{ fontSize: "20px", lineHeight: "1.8rem", textAlign: "center" }}
          >
            Every product is manufactured through a disciplined, process-driven
            approach. Skilled workers, quality inspections, and experience built
            over decades ensure long-term durability.
            <br />
            <br />
            The company specializes in office tables, workstations, steel
            cupboards, racks, and custom furniture solutions for banks and
            government offices.
            <br />
            <br />
            With more than 35 years of experience, Arun Office Needs remains a
            trusted office furniture manufacturer in Tamil Nadu.
          </Typography>
        </Grid>

        {/* Secondary Images 2 & 3 */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <div
            style={{
              backgroundImage: `url(${AONFactory})`,
              width: "100%",
              height: "400px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />
        </Grid>
      </Grid>

      {/* ================= CONTACT ================= */}
      <Grid sx={{ px: { xs: 2, md: 8 }, pb: 8 }}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "2rem", sm: "4rem" },
            textAlign: "center",
            mb: 4,
          }}
        >
          Get in touch with Arun Office Needs
        </Typography>

        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, sm: 8 }} sx={{ height: "480px" }}>
            {/* <Grid size={{ xs: 12, sm: 6 }}> */}
            <div
              style={{
                backgroundImage: `url(${AONFDR})`,
                width: "100%",
                height: "500px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                
              }}
            />
            {/* </Grid> */}
            {/* Map iframe can be added here */}
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <ContactusForm />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutUs;
