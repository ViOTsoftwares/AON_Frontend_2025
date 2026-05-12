import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Typography,
  Avatar,
  Fade,
  Slide,
  Snackbar,
  Alert,
  CircularProgress,
  Zoom,
  Grid,
  Stack,
} from "@mui/material";
import {
  CloudUpload,
  Send,
  Person,
  Email,
  Description as DescIcon,
  CheckCircle,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import "../components/Animations/ButtonGlow.css";
import { CustomizationFormTwoApi } from "../Api_Action";
import { toastMessage } from "../toastMessage";
const StyledCard = styled(Card)(({ theme }) => ({
  margin: "auto",
  borderRadius: 24,
  background: "var(--color-surface-frost-strong)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
}));

const ImageUploadBox = styled(Box)({
  border: "2px dashed var(--color-info)",
  width: "100%",
  borderRadius: 16,
  padding: 10,
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  background: "rgba(102, 126, 234, 0.05)",
  "&:hover": {
    borderColor: "var(--color-secondary)",
    background: "rgba(102, 126, 234, 0.1)",
    transform: "scale(1.02)",
  },
});

const questions = [
  "How did you hear about us?",
  "What service are you interested in?",
  "What is your budget range?",
  "When do you plan to start?",
  "What is your primary goal?",
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
    description: "",
  });
  const { description, email, name, question } = formData;
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImage(file);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.question) {
      newErrors.question = "Please select a question";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const fs = new FormData();
    fs.append("name", name);
    fs.append("email", email);
    fs.append("question", question);
    fs.append("description", description);
    if (image) {
      fs.append("image", image);
    }

    try {
      const response = await CustomizationFormTwoApi(fs);
      console.log(response);
      if (response?.success) {
        setOpenSnackbar(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          question: "",
          description: "",
        });
        setImage(null);
        toastMessage(response.message, "success");
      } else {
        toastMessage(response?.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.error("Customization form submit error:", error);
      toastMessage("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid>
      <div>
        <Fade in timeout={800}>
          <StyledCard>
            <CardContent sx={{ padding: 4 }}>
              <Slide direction="down" in timeout={600}>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 550,
                    }}
                  >
                    Let's Customize
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Fill out the form below and we'll get back to you shortly
                  </Typography>
                </Box>
              </Slide>

              <form onSubmit={handleSubmit}>
                <Grid
                  columns={{ xs: 12, md: 12, lg: 24 }}
                  container
                  rowGap={2}
                  columnGap={2}
                >
                  <Grid size={{ xs: 12, md: 6, lg: 11.5 }}>
                    <Zoom in timeout={700}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        error={!!errors.name}
                        helperText={errors.name}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <Person sx={{ mr: 1, color: "var(--color-info)" }} />
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover fieldset": {
                              borderColor: "var(--color-info)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--color-info)",
                            },
                          },
                        }}
                      />
                    </Zoom>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6, lg: 11.5 }}>
                    <Zoom in timeout={800}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        error={!!errors.email}
                        helperText={errors.email}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <Email sx={{ mr: 1, color: "var(--color-info)" }} />
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover fieldset": {
                              borderColor: "var(--color-info)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--color-info)",
                            },
                          },
                        }}
                      />
                    </Zoom>
                  </Grid>
                  <Grid size={{ xs: 12, md: 12, lg: 24 }}>
                    <Zoom in timeout={900}>
                      <Box>
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="image-upload"
                          type="file"
                          onChange={handleImageUpload}
                        />
                        <label htmlFor="image-upload">
                          <ImageUploadBox>
                            {image ? (
                              <Box sx={{ textAlign: "center" }}>
                                <Avatar
                                  src={URL.createObjectURL(image)}
                                  sx={{
                                    width: 100,
                                    height: 100,
                                    border: "3px solid var(--color-info)",
                                    margin: "auto",
                                    mb: 1,
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Click to change image
                                </Typography>
                              </Box>
                            ) : (
                              <>
                                <CloudUpload
                                  sx={{ fontSize: 48, color: "var(--color-info)", mb: 1 }}
                                />
                                <Typography variant="h6">
                                  Upload Image
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Click to browse
                                </Typography>
                              </>
                            )}
                          </ImageUploadBox>
                        </label>
                      </Box>
                    </Zoom>
                  </Grid>
                  <Grid size={{ xs: 12, md: 12, lg: 24 }}>
                    <Zoom in timeout={1000}>
                      <FormControl
                        error={!!errors.question}
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover fieldset": {
                              borderColor: "var(--color-info)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--color-info)",
                            },
                          },
                        }}
                      >
                        <InputLabel>Select a Question</InputLabel>
                        <Select
                          value={formData.question}
                          label="Select a Question"
                          onChange={(e) =>
                            handleInputChange("question", e.target.value)
                          }
                        >
                          {questions.map((question, index) => (
                            <MenuItem key={index} value={question}>
                              {question}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.question && (
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{ mt: 0.5, ml: 2 }}
                          >
                            {errors.question}
                          </Typography>
                        )}
                      </FormControl>
                    </Zoom>
                  </Grid>
                  <Grid size={{ xs: 12, md: 12, lg: 24 }}>
                    <Zoom in timeout={1100}>
                      <TextField
                        label="Description"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        error={!!errors.description}
                        helperText={errors.description}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <DescIcon
                                sx={{
                                  mr: 1,
                                  color: "var(--color-info)",
                                  alignSelf: "flex-start",
                                  mt: 1,
                                }}
                              />
                            ),
                          },
                        }}
                        sx={{
                          alignSelf: "center",
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover fieldset": {
                              borderColor: "var(--color-info)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--color-info)",
                            },
                          },
                        }}
                      />
                    </Zoom>
                  </Grid>
                  <Grid>
                    <Zoom in timeout={1200}>
                      <Button
                        type="submit"
                        variant="contained"
                        className="glow-on-hover"
                        disabled={loading}
                        startIcon={
                          loading ? (
                            <CircularProgress size={20} color="white" />
                          ) : (
                            <Send />
                          )
                        }
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </Zoom>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </StyledCard>
        </Fade>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            icon={<CheckCircle />}
            sx={{
              borderRadius: 2,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            Message sent successfully! We'll get back to you soon.
          </Alert>
        </Snackbar>
      </div>
    </Grid>
  );
};

export default ContactForm;
