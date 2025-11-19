import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Avatar,
  Stack,
  IconButton,
  Input,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
// Import the Google Gen AI SDK
import { GoogleGenAI } from "@google/genai";

// 🛑 IMPORTANT: Replace 'YOUR_GEMINI_API_KEY' with the key you generated.
// For production apps, this should be loaded from a secure environment variable.
const API_KEY = "AIzaSyBwrrTuFoCJ9DcnCqR6DmJ36MLHvBfdbms";
const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

// --- Utilities (defensive) ---
function clampByte(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(255, Math.round(num)));
}

function componentToHex(c) {
  const clamped = clampByte(c);
  const hex = clamped.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function normalizeHexInput(raw) {
  if (raw == null) return null;
  let s = typeof raw === "string" ? raw.trim() : String(raw).trim();
  if (s.length === 0) return null;
  if (s.startsWith("#")) s = s.slice(1);
  if (s.length === 3)
    s = s
      .split("")
      .map((ch) => ch + ch)
      .join("");
  if (!/^[0-9a-fA-F]{6}$/.test(s)) return null;
  return s.toLowerCase();
}

function hexToRgb(hex) {
  const parsed = normalizeHexInput(hex);
  if (!parsed) return null;
  const r = parseInt(parsed.slice(0, 2), 16);
  const g = parseInt(parsed.slice(2, 4), 16);
  const b = parseInt(parsed.slice(4, 6), 16);
  return { r, g, b };
}

function hsvToRgb(h, s, v) {
  const c = v * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  let r1 = 0,
    g1 = 0,
    b1 = 0;

  if (0 <= hh && hh < 1) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (1 <= hh && hh < 2) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (2 <= hh && hh < 3) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (3 <= hh && hh < 4) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (4 <= hh && hh < 5) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  const m = v - c;
  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255),
  ];
}

// --- Questions (Your Configuration Details) ---
const QUESTIONS = [
  {
    id: "category",
    type: "choice",
    text: "Which category would you like to customize?",
    choices: [
      "Revolving chair",
      "Office chair",
      "Waiting chair",
      "Restaurant chair",
      "Sofa/Recliner",
      "Training chair",
    ],
  },

  // Revolving chair
  {
    id: "r_type",
    parent: { id: "category", value: "Revolving chair" },
    type: "choice",
    text: "Choose back height",
    choices: ["High back", "Medium back", "Low back"],
  },
  {
    id: "r_seat",
    parent: { id: "category", value: "Revolving chair" },
    type: "choice",
    text: "Seat material",
    choices: ["Cushion", "Mesh", "Wire"],
  },
  {
    id: "r_back",
    parent: { id: "category", value: "Revolving chair" },
    type: "choice",
    text: "Back style",
    choices: ["Cushion", "Mesh"],
  },
  {
    id: "r_cushion",
    parent: { id: "r_seat", value: "Cushion" },
    type: "choice",
    text: "Cushion material",
    choices: ["Fabric", "Leather"],
  },
  {
    id: "r_base",
    parent: { id: "category", value: "Revolving chair" },
    type: "choice",
    text: "Base material",
    choices: ["Metal", "ABS", "Chromium"],
  },
  {
    id: "r_seat_color",
    parent: { id: "category", value: "Revolving chair" },
    type: "color",
    text: "Seat colour",
    placeholder: "e.g. #000000 or name",
  },
  {
    id: "r_frame_color",
    parent: { id: "category", value: "Revolving chair" },
    type: "color",
    text: "Frame colour",
    placeholder: "e.g. Grey",
  },
  {
    id: "r_handle_mat",
    parent: { id: "category", value: "Revolving chair" },
    type: "choice",
    text: "Handle material",
    choices: ["PU", "Plastic"],
  },
  {
    id: "r_handle_move",
    parent: { id: "category", value: "Revolving chair" },
    type: "choice",
    text: "Handle movement",
    choices: ["Adjustable", "Fixed"],
  },

  // Office chair
  {
    id: "o_arm",
    parent: { id: "category", value: "Office chair" },
    type: "choice",
    text: "With arm or without arm?",
    choices: ["With arm", "Without arm"],
  },
  {
    id: "o_base",
    parent: { id: "category", value: "Office chair" },
    type: "choice",
    text: "Base type",
    choices: ["4 leg", "Sledge base"],
  },
  {
    id: "o_seat",
    parent: { id: "category", value: "Office chair" },
    type: "choice",
    text: "Seat material",
    choices: ["Cushion", "Mesh", "Wire"],
  },
  {
    id: "o_back",
    parent: { id: "category", value: "Office chair" },
    type: "choice",
    text: "Back material",
    choices: ["Cushion", "Mesh"],
  },
  {
    id: "o_cover",
    parent: { id: "category", value: "Office chair" },
    type: "choice",
    text: "Cover material",
    choices: ["Fabric", "Leather"],
  },
  {
    id: "o_paint",
    parent: { id: "category", value: "Office chair" },
    type: "choice",
    text: "Base finish",
    choices: ["Chromium", "Powder coat"],
  },
  {
    id: "o_seat_color",
    parent: { id: "category", value: "Office chair" },
    type: "color",
    text: "Seat colour",
    placeholder: "e.g. Black",
  },
  {
    id: "o_frame_color",
    parent: { id: "category", value: "Office chair" },
    type: "color",
    text: "Frame colour",
    placeholder: "e.g. Black",
  },
  {
    id: "o_handle_mat",
    parent: { id: "category", value: "Office chair" },
    type: "choice",
    text: "Handle material",
    choices: ["PU", "Plastic"],
  },
  {
    id: "o_handle_move",
    parent: { id: "category", value: "Office chair" },
    type: "choice",
    text: "Handle movement",
    choices: ["Adjustable", "Fixed"],
  },

  // Waiting chair
  {
    id: "w_count",
    parent: { id: "category", value: "Waiting chair" },
    type: "choice",
    text: "How many seats required?",
    choices: ["1", "2", "3", "4", "5+"],
  },
  {
    id: "w_base",
    parent: { id: "category", value: "Waiting chair" },
    type: "choice",
    text: "Base material",
    choices: ["Stainless steel", "MS steel"],
  },
  {
    id: "w_cushion",
    parent: { id: "category", value: "Waiting chair" },
    type: "choice",
    text: "With cushion or without cushion?",
    choices: ["Cushion", "Without cushion"],
  },
  {
    id: "w_cushion_mat",
    parent: { id: "w_cushion", value: "Cushion" },
    type: "choice",
    text: "Cushion material",
    choices: ["Leather", "PU", "Fabric"],
  },
  {
    id: "w_frame_color",
    parent: { id: "category", value: "Waiting chair" },
    type: "color",
    text: "Frame colour",
    placeholder: "e.g. Grey",
  },

  // Restaurant chair
  {
    id: "res_frame",
    parent: { id: "category", value: "Restaurant chair" },
    type: "choice",
    text: "Frame material",
    choices: ["Metal", "Wood"],
  },
  {
    id: "res_cushion",
    parent: { id: "category", value: "Restaurant chair" },
    type: "choice",
    text: "Seat and back with cushion?",
    choices: ["Cushion", "Without cushion"],
  },
  {
    id: "res_seat_mat",
    parent: { id: "category", value: "Restaurant chair" },
    type: "choice",
    text: "Seat material",
    choices: ["Suede", "Leather", "Fabric"],
  },

  // Sofa / Recliner
  {
    id: "s_type",
    parent: { id: "category", value: "Sofa/Recliner" },
    type: "choice",
    text: "Sofa or Recliner?",
    choices: ["Sofa", "Recliner"],
  },
  {
    id: "s_unit",
    parent: { id: "s_type", value: "Sofa" },
    type: "choice",
    text: "Corner L unit or separate unit?",
    choices: ["L unit", "Separate unit"],
  },
  {
    id: "s_lounge",
    parent: { id: "s_type", value: "Sofa" },
    type: "choice",
    text: "With or without lounge?",
    choices: ["With", "Without"],
  },
  {
    id: "s_material",
    parent: { id: "category", value: "Sofa/Recliner" },
    type: "choice",
    text: "Material",
    choices: ["Fabric", "Leather"],
  },
  {
    id: "s_seater",
    parent: { id: "category", value: "Sofa/Recliner" },
    type: "choice",
    text: "Number of seaters",
    choices: ["1", "2", "3", "4", "5"],
  },

  // Training chair
  {
    id: "t_mat",
    parent: { id: "category", value: "Training chair" },
    type: "choice",
    text: "Seat & back material",
    choices: ["Perforated steel", "Mesh", "Cushion"],
  },
  {
    id: "t_pad",
    parent: { id: "category", value: "Training chair" },
    type: "choice",
    text: "Pad option",
    choices: ["Full pad", "Half pad", "Without pad"],
  },
  {
    id: "t_wheels",
    parent: { id: "category", value: "Training chair" },
    type: "choice",
    text: "Wheels required?",
    choices: ["With wheels", "Without wheels"],
  },
];

// --- Component ---
export default function FurnitureCustomizationChatbot() {
  const [messages, setMessages] = useState([
    {
      id: "bot-1",
      from: "bot",
      text: "Welcome! Let's customize your furniture. Click a category to start.",
    },
  ]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [typing, setTyping] = useState(false);
  const [otherInputs, setOtherInputs] = useState({});
  const [colorDrafts, setColorDrafts] = useState({});
  const [spectrumCanvases, setSpectrumCanvases] = useState({});
  const chatRef = useRef();
  const spectrumRefs = useRef({});

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  function pushMessage(msg) {
    const from = msg && msg.from ? msg.from : "bot";
    const raw = Object.prototype.hasOwnProperty.call(msg || {}, "text")
      ? msg.text
      : "";
    const text =
      raw == null ? "" : typeof raw === "string" ? raw : JSON.stringify(raw);
    setMessages((prev) => [
      ...prev,
      { id: `${from}-${Date.now()}`, from, text },
    ]);
  }

  // Dynamic Bot Response using Gemini
  async function generateBotResponse(currentAnswers) {
    if (API_KEY === "YOUR_GEMINI_API_KEY") {
      setTyping(false);
      pushMessage({
        from: "bot",
        text: "Noted. (Please insert your actual API key to enable intelligent AI responses!)",
      });
      return;
    }

    // 1. Format the current configuration for the AI
    const config = Object.entries(currentAnswers)
      .map(([key, value]) => {
        const question = QUESTIONS.find((q) => q.id === key);
        return question ? `${question.text}: ${value}` : `${key}: ${value}`;
      })
      .join("\n");

    const prompt = `You are an expert furniture customization assistant. The user is configuring a piece of furniture. Their current configuration is:\n\n---\n${config}\n---\n\nBased on this, provide a concise, friendly, and encouraging acknowledgment of the latest choice, and perhaps a subtle design suggestion or an interesting fact about their chosen configuration. DO NOT ask the next question, just provide conversational feedback. Keep the response to 1-2 short sentences.`;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      const text = response.text.trim();
      if (text) {
        pushMessage({ from: "bot", text });
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      pushMessage({
        from: "bot",
        text: "I've noted your selection! (Error generating dynamic response.)",
      });
    } finally {
      setTyping(false);
    }
  }

  function handleCategorySelect(cat) {
    const newAnswers = {
      ...Object.fromEntries(
        Object.entries(answers).filter(([k]) => k === "category")
      ),
      category: cat,
    };
    setAnswers(newAnswers);
    pushMessage({ from: "user", text: cat });
    setCurrent(cat);
    setTyping(true);
    // Use an immediate, static response for the category to kick things off fast
    setTimeout(() => {
      setTyping(false);
      pushMessage({
        from: "bot",
        text: `Great choice! We're now customizing a **${cat}**. Please proceed with the options below.`,
      });
    }, 400);
  }

  function handleChoice(qid, value) {
    if (value === "Other") {
      setOtherInputs((prev) => ({ ...prev, [qid]: "" }));
      return;
    }
    const newAnswers = { ...answers, [qid]: String(value) };
    setAnswers(newAnswers);
    pushMessage({
      from: "user",
      text: `${QUESTIONS.find((q) => q.id === qid)?.text}: ${value}`,
    });
    setTyping(true);
    generateBotResponse(newAnswers);
  }

  function handleOtherSave(qid) {
    const text = (otherInputs[qid] || "").trim();
    if (!text) return;
    const newAnswers = { ...answers, [qid]: `Other: ${text}` };
    setAnswers(newAnswers);
    setOtherInputs((prev) => {
      const c = { ...prev };
      delete c[qid];
      return c;
    });
    pushMessage({
      from: "user",
      text: `${QUESTIONS.find((q) => q.id === qid)?.text}: ${text}`,
    });
    setTyping(true);
    generateBotResponse(newAnswers);
  }

  function handleColorDraftChange(qid, field, value) {
    setColorDrafts((prev) => ({
      ...prev,
      [qid]: { ...(prev[qid] || {}), [field]: value },
    }));
  }

  function saveColor(qid) {
    const draft = colorDrafts[qid] || {};
    let saved = "";
    if (draft.hex && draft.hex.startsWith("#") && draft.hex.length === 7)
      saved = draft.hex;
    else if (
      typeof draft.r !== "undefined" &&
      typeof draft.g !== "undefined" &&
      typeof draft.b !== "undefined"
    ) {
      const r = Number(draft.r) || 0,
        g = Number(draft.g) || 0,
        b = Number(draft.b) || 0;
      saved = `rgb(${r}, ${g}, ${b}) / ${rgbToHex(r, g, b)}`;
    } else if (draft.hex && typeof draft.hex === "string") {
      saved = draft.hex;
    }

    if (!saved) return;
    const newAnswers = { ...answers, [qid]: String(saved) };
    setAnswers(newAnswers);
    pushMessage({
      from: "user",
      text: `${QUESTIONS.find((q) => q.id === qid)?.text}: ${saved}`,
    });
    setTyping(true);
    generateBotResponse(newAnswers);
  }

  // --- Spectrum Rendering/Handling ---
  function drawSpectrumProcedural(canvas) {
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");

    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;

    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;

    ctx.scale(dpr, dpr);

    const width = cssWidth;
    const height = cssHeight;

    const img = ctx?.createImageData(width, height);
    let p = 0;

    for (let y = 0; y < height; y++) {
      const v = 1 - y / (height - 1);
      for (let x = 0; x < width; x++) {
        const h = (x / (width - 1)) * 360;
        const s = 1;
        const [r, g, b] = hsvToRgb(h, s, v);

        img.data[p++] = r;
        img.data[p++] = g;
        img.data[p++] = b;
        img.data[p++] = 255;
      }
    }

    ctx.putImageData(img, 0, 0);
  }

  function attachSpectrumCanvas(qid, canvas) {
    if (!canvas) return;

    // save DOM element WITHOUT re-render
    spectrumRefs.current[qid] = canvas;

    // wait one frame so clientWidth is correct
    requestAnimationFrame(() => {
      drawSpectrumProcedural(canvas);
    });
  }

  function handleSpectrumClick(qid, e) {
    const canvas = spectrumRefs.current[qid];
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(x, y, 1, 1).data;

    console.log("picked color:", pixel);
  }

  const activeQuestions = QUESTIONS.filter((q) => {
    if (q.id === "category") return false;
    if (!q.parent) return false;
    return (
      answers[q.parent.id] === q.parent.value ||
      (q.parent.id === "category" && answers["category"] === current)
    );
  });
  const unansweredForCurrent = activeQuestions.filter((q) => !answers[q.id]);

  // Function for the chat input submission for 'text'/'color' type questions
  const handleChatInputSubmit = () => {
    const text = inputValue.trim();
    if (!text) return;
    const q = unansweredForCurrent[0];
    if (q && (q.type === "text" || q.type === "color")) {
      const newAnswers = { ...answers, [q.id]: text };
      setAnswers(newAnswers);
      pushMessage({ from: "user", text: `${q.text}: ${text}` });
      setInputValue("");
      setTyping(true);
      generateBotResponse(newAnswers);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, p: 2, height: "80vh" }}>
      <Paper
        sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column" }}
        elevation={3}
      >
        <Typography variant="h6">
          Furniture Customizer — Chat (AI Enabled 🤖)
        </Typography>
        <Box
          ref={chatRef}
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 1,
            bgcolor: "grey.50",
            borderRadius: 1,
            mt: 1,
          }}
        >
          {messages?.map((m) => {
            const isUser = m.from === "user";
            return (
              <Box
                key={m.id}
                sx={{
                  display: "flex",
                  mb: 1,
                  justifyContent: isUser ? "flex-end" : "flex-start",
                }}
              >
                {!isUser && (
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 28,
                      height: 28,
                      mr: 1,
                    }}
                  >
                    B
                  </Avatar>
                )}
                <Paper
                  sx={{
                    p: 1,
                    maxWidth: "75%",
                    bgcolor: isUser ? "secondary.main" : "background.paper",
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                    {typeof m.text === "string"
                      ? m.text
                      : JSON.stringify(m.text)}
                  </Typography>
                </Paper>
                {isUser && (
                  <Avatar
                    sx={{
                      bgcolor: "secondary.main",
                      width: 28,
                      height: 28,
                      ml: 1,
                    }}
                  >
                    U
                  </Avatar>
                )}
              </Box>
            );
          })}
          {typing && (
            <Box sx={{ display: "flex", py: 1 }}>
              <Typography variant="caption">Bot is typing</Typography>
              <Typography variant="caption" sx={{ ml: 1 }}>
                •••
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 1, display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            placeholder={
              unansweredForCurrent?.length
                ? unansweredForCurrent?.[0]?.placeholder || "Type your answer"
                : "Choose a category to begin"
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                unansweredForCurrent?.length &&
                (unansweredForCurrent?.[0].type === "text" ||
                  unansweredForCurrent?.[0].type === "color")
              ) {
                handleChatInputSubmit();
              }
            }}
            fullWidth
            size="small"
            disabled={
              !unansweredForCurrent?.length ||
              (unansweredForCurrent?.[0].type !== "text" &&
                unansweredForCurrent?.[0].type !== "color")
            }
          />
          <IconButton
            color="primary"
            onClick={handleChatInputSubmit}
            disabled={
              !unansweredForCurrent?.length ||
              (unansweredForCurrent?.[0].type !== "text" &&
                unansweredForCurrent?.[0].type !== "color")
            }
          >
            <SendIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setMessages([
                {
                  id: "bot-1",
                  from: "bot",
                  text: "Welcome! Let's customize your furniture. Click a category to start.",
                },
              ]);
              setAnswers({});
              setCurrent(null);
              setInputValue("");
              setOtherInputs({});
              setColorDrafts({});
              setSpectrumCanvases({});
            }}
          >
            <RestartAltIcon />
          </IconButton>
        </Box>
      </Paper>

      <Paper
        sx={{
          width: 480,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        elevation={3}
      >
        <Typography variant="subtitle1">Categories</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {QUESTIONS?.find((q) => q.id === "category")?.choices?.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              color={current === cat ? "primary" : "default"}
              onClick={() => handleCategorySelect(cat)}
            />
          ))}
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">
            Options for: {current || "—"}
          </Typography>

          {current && (
            <Box
              sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}
            >
              {QUESTIONS?.filter(
                (q) =>
                  q.parent &&
                  (answers[q.parent.id] === q.parent.value ||
                    (q.parent.id === "category" &&
                      answers["category"] === current))
              ).map((q) => (
                <Box key={q.id}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {q.text}
                  </Typography>

                  {q.type === "choice" && (
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      alignItems="center"
                    >
                      {q.choices.concat(["Other"]).map((choice) => (
                        <React.Fragment key={choice}>
                          <Button
                            size="small"
                            variant={
                              answers[q.id] === choice
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() => handleChoice(q.id, choice)}
                          >
                            {choice}
                          </Button>
                          {choice === "Other" &&
                            otherInputs[q.id] !== undefined && (
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  mt: 1,
                                  alignItems: "center",
                                }}
                              >
                                <TextField
                                  size="small"
                                  placeholder="Type other..."
                                  value={otherInputs[q.id] || ""}
                                  onChange={(e) =>
                                    setOtherInputs((prev) => ({
                                      ...prev,
                                      [q.id]: e.target.value,
                                    }))
                                  }
                                />
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => handleOtherSave(q.id)}
                                >
                                  Save
                                </Button>
                              </Box>
                            )}
                        </React.Fragment>
                      ))}
                    </Stack>
                  )}

                  {q.type === "text" && (
                    <TextField
                      size="small"
                      placeholder={q.placeholder || "Type..."}
                      value={
                        typeof answers[q.id] === "string"
                          ? answers[q.id]
                          : answers[q.id] != null
                          ? String(answers[q.id])
                          : ""
                      }
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
                      }
                      onBlur={handleChatInputSubmit}
                      fullWidth
                      sx={{ mt: 1 }}
                    />
                  )}

                  {q?.type === "color" && (
                    //  console.log(q)
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexDirection: "column",
                        mt: 1,
                      }}
                    >
                      <Typography variant="caption">
                        Click on the spectrum below to pick a color visually
                      </Typography>
                      <canvas
                        style={{ width: "448px", height: "160px" }}
                        ref={(el) => attachSpectrumCanvas(q.id, el)}
                        onClick={(e) => handleSpectrumClick(q.id, e)}
                      ></canvas>

                      {/* <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1 }}>
                        <Input type="color" value={(colorDrafts?.[q?.id] && (colorDrafts?.[q?.id].hex || "#000000")) || "#000000"} onChange={e => handleColorDraftChange(q?.id, "hex", e.target.value)} />
                        <TextField size="small" label="Hex / Name" placeholder={q?.placeholder} value={(colorDrafts?.[q?.id] && colorDrafts[q?.id].hex) || ""} onChange={e => handleColorDraftChange(q.id, "hex", e.target.value)} />
                      </Box> */}

                      {/* <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <TextField size="small" label="R" type="number" inputProps={{ min: 0, max: 255 }} value={(colorDrafts[q.id] && colorDrafts[q.id].r) || ""} onChange={e => handleColorDraftChange(q.id, "r", e.target.value)} />
                        <TextField size="small" label="G" type="number" inputProps={{ min: 0, max: 255 }} value={(colorDrafts[q.id] && colorDrafts[q.id].g) || ""} onChange={e => handleColorDraftChange(q.id, "g", e.target.value)} />
                        <TextField size="small" label="B" type="number" inputProps={{ min: 0, max: 255 }} value={(colorDrafts[q.id] && colorDrafts[q.id].b) || ""} onChange={e => handleColorDraftChange(q.id, "b", e.target.value)} />
                        <Button size="small" variant="contained" onClick={() => {
                          const hex = (colorDrafts[q.id] && colorDrafts[q.id].hex) || "";
                          if (hex && typeof hex === "string" && hex.startsWith("#") && hex.length === 7) {
                            const rgb = hexToRgb(hex);
                            if (rgb) { handleColorDraftChange(q.id, "r", rgb.r); handleColorDraftChange(q.id, "g", rgb.g); handleColorDraftChange(q.id, "b", rgb.b); }
                          } else if (colorDrafts[q.id] && typeof colorDrafts[q.id].r !== "undefined") {
                            const r = Number(colorDrafts[q.id].r) || 0;
                            const g = Number(colorDrafts[q.id].g) || 0;
                            const b = Number(colorDrafts[q.id].b) || 0;
                            handleColorDraftChange(q.id, "hex", rgbToHex(r, g, b));
                          }
                        }}>Sync</Button>
                        <Button size="small" variant="outlined" onClick={() => saveColor(q.id)}>Save</Button>

                        <Box sx={{ width: 32, height: 24, border: "1px solid #ccc", ml: 1, backgroundColor: (colorDrafts[q.id] && (colorDrafts[q.id].hex || (colorDrafts[q.id].r ? rgbToHex(Number(colorDrafts[q.id].r), Number(colorDrafts[q.id].g || 0), Number(colorDrafts[q.id].b || 0)) : "transparent"))) || "transparent" }} />
                      </Box> */}
                    </Box>
                  )}
                </Box>
              ))}

              <Box sx={{ mt: 1 }}>
                <Typography variant="caption">Summary</Typography>
                <Paper sx={{ p: 1, mt: 0.5 }}>
                  {Object.keys(answers).length === 0 ? (
                    <Typography variant="body2">No selections yet.</Typography>
                  ) : (
                    <Stack spacing={0.5}>
                      {Object.entries(answers).map(([k, v]) => (
                        <Typography key={k} variant="body2">
                          {k}: {typeof v === "string" ? v : JSON.stringify(v)}
                        </Typography>
                      ))}
                    </Stack>
                  )}
                </Paper>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
