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
const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  margin: "auto",
  borderRadius: 24,
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
}));

const ImageUploadBox = styled(Box)({
  border: "2px dashed #667eea",
  borderRadius: 16,
  padding: 10,
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  background: "rgba(102, 126, 234, 0.05)",
  "&:hover": {
    borderColor: "#764ba2",
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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    setOpenSnackbar(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      question: "",
      description: "",
    });
    setImage(null);
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
                <Stack gap={2}>
                  <Stack direction="row" columnGap={2}>
                    <Zoom in timeout={700}>
                      <TextField
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
                              <Person sx={{ mr: 1, color: "#667eea" }} />
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover fieldset": {
                              borderColor: "#667eea",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#667eea",
                            },
                          },
                        }}
                      />
                    </Zoom>

                    <Zoom in timeout={800}>
                      <TextField
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
                              <Email sx={{ mr: 1, color: "#667eea" }} />
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover fieldset": {
                              borderColor: "#667eea",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#667eea",
                            },
                          },
                        }}
                      />
                    </Zoom>
                  </Stack>

                  <Stack direction="row" columnGap={2} alignItems="center">
                    <Zoom in timeout={900}>
                      <Box alignSelf="start" width="44%">
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
                              <Box>
                                <Avatar
                                  src={image}
                                  sx={{
                                    width: 100,
                                    height: 100,
                                    margin: "auto",
                                    mb: 2,
                                    border: "4px solid #667eea",
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
                              <Box>
                                <CloudUpload
                                  sx={{ fontSize: 48, color: "#667eea", mb: 1 }}
                                />
                                <Typography variant="h6" color="text.primary">
                                  Upload Image
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Click to browse or drag and drop
                                </Typography>
                              </Box>
                            )}
                          </ImageUploadBox>
                        </label>
                      </Box>
                    </Zoom>

                    <Zoom in timeout={1000}>
                      <FormControl
                        alignSelf="center"
                        error={!!errors.question}
                        sx={{
                          width: "44%",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover fieldset": {
                              borderColor: "#667eea",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#667eea",
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
                  </Stack>

                  <Zoom in timeout={1100}>
                    <TextField
                      label="Description"
                      alignSelf="center"
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
                                color: "#667eea",
                                alignSelf: "flex-start",
                                mt: 1,
                              }}
                            />
                          ),
                        },
                      }}
                      sx={{
                       width:"90%",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover fieldset": {
                            borderColor: "#667eea",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#667eea",
                          },
                        },
                      }}
                    />
                  </Zoom>

                  <Zoom in timeout={1200}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ alignSelf: "start", width: "40%" }}
                      className="glow-on-hover"
                      disabled={loading}
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Send />
                        )
                      }
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </Zoom>
                </Stack>
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
