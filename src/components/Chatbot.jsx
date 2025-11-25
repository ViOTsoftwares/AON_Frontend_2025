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
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// Import the Google Gen AI SDK
import { GoogleGenAI } from "@google/genai";

// --- CONFIG / IMAGE PATH ---
const EXAMPLE_IMG = "/mnt/data/WhatsApp Image 2025-11-25 at 14.27.56.jpeg";
const API_KEY = "AIzaSyBwrrTuFoCJ9DcnCqR6DmJ36MLHvBfdbms"; // set this in your env
const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

// --- Utilities ---
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

// --- Questions (trimmed to the set used in the original component) ---
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
  {
    id: "r_type",
    parent: { id: "category", value: "Revolving chair" },
    type: "choice",
    text: "Choose back height",
    choices: [
      { key: "High back", label: "High back", img: "https://omacme.in/cdn/shop/products/Revolving-Executive-Net-Chair-Nylon-Base_1318_Angle-View.jpg?v=1678789367&width=640" },
      { key: "Medium back", label: "Medium back", img: "https://5.imimg.com/data5/SELLER/Default/2022/12/TG/RD/BE/2719334/butterfly-medium-back-chair.JPG" },
      { key: "Low back", label: "Low back", img: "https://www.nilkamalhomes.com/cdn/shop/products/MAYOR_LOW_BACK_LS.jpg?v=1637750447&width=1214" },
    ],
  },
  {
    id: "r_seat",
    parent: { id: "category", value: "Revolving chair" },
    type: "choice",
    text: "Seat material",
    choices: [
      { key: "Cushion", label: "Cushion", img: EXAMPLE_IMG },
      { key: "Mesh", label: "Mesh", img: "https://img500.exportersindia.com/product_images/bc-500/dir_147/4399861/air-mesh-fabric-1484321931-2685686.jpeg" },
      { key: "Wire", label: "Wire", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvVHJZbuJUc9FTaz9RFJf9MeplhsL1vSHUOg&s" },
    ],
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
];

// --- OptionCard ---
function OptionCard({ option, selected, onClick, index }) {
  const label = typeof option === "string" ? option : option.label || option.key;
  const img = typeof option === "string" ? null : option.img || null;

  return (
    <Card
      onClick={onClick}
      elevation={selected ? 6 : 1}
      sx={{
        width: 148,
        borderRadius: 1,
        border: 2,
        borderColor: selected ? "primary.main" : "divider",
        position: "relative",
        bgcolor: selected ? "background.paper" : "background.default",
        cursor: "pointer",
      }}
      role="button"
      aria-pressed={selected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick && onClick();
        }
      }}
    >
      <CardActionArea sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        {img ? (
          <CardMedia component="img" image={img} alt={label} loading="lazy" sx={{ height: 88, objectFit: "cover" }} />
        ) : (
          <Box sx={{ height: 88, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "grey.100" }}>
            <Typography variant="caption">No image</Typography>
          </Box>
        )}

        <CardContent sx={{ p: 1 }}>
          <Typography variant="body2" align="center" noWrap>
            {label}
          </Typography>
        </CardContent>

        <Box sx={{ position: "absolute", top: 6, left: 6, width: 22, height: 22, borderRadius: "50%", bgcolor: selected ? "primary.main" : "grey.300", color: selected ? "primary.contrastText" : "text.primary", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", pointerEvents: "none" }}>
          {index + 1}
        </Box>

        {selected && (
          <CheckCircleIcon sx={{ position: "absolute", top: 6, right: 6, color: "primary.main", bgcolor: "background.paper", borderRadius: "50%" }} fontSize="small" />
        )}
      </CardActionArea>
    </Card>
  );
}

// --- Component (single container, one column) ---
export default function FurnitureCustomizationChatbotSingleColumn() {
  const [messages, setMessages] = useState([
    { id: "bot-1", from: "bot", text: "Welcome! Let's customize your furniture. Click a category to start." },
  ]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [typing, setTyping] = useState(false);
  const [otherInputs, setOtherInputs] = useState({});
  const [colorDrafts, setColorDrafts] = useState({});
  const chatRef = useRef();
  const spectrumRefs = useRef({});
  const generateTimeoutRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  function pushMessage(msg) {
    const from = msg && msg.from ? msg.from : "bot";
    const raw = Object.prototype.hasOwnProperty.call(msg || {}, "text") ? msg.text : "";
    const text = raw == null ? "" : typeof raw === "string" ? raw : JSON.stringify(raw);
    setMessages((prev) => [...prev, { id: `${from}-${Date.now()}`, from, text }]);
  }

  async function generateBotResponse(currentAnswers) {
    if (!API_KEY) {
      setTyping(false);
      pushMessage({ from: "bot", text: "Noted. (AI disabled — no API key configured on the client.)" });
      return;
    }

    if (generateTimeoutRef.current) clearTimeout(generateTimeoutRef.current);
    setTyping(true);

    generateTimeoutRef.current = setTimeout(async () => {
      const config = Object.entries(currentAnswers)
        .map(([key, value]) => {
          const question = QUESTIONS.find((q) => q.id === key);
          return question ? `${question.text}: ${value}` : `${key}: ${value}`;
        })
        .join("\n");

      const prompt = `You are an expert furniture customization assistant. The user is configuring a piece of furniture. Their current configuration is:\n\n---\n${config}\n---\n\nBased on this, provide a concise, friendly, and encouraging acknowledgment of the latest choice, and perhaps a subtle design suggestion or an interesting fact about their chosen configuration. DO NOT ask the next question, just provide conversational feedback. Keep the response to 1-2 short sentences.`;

      try {
        const response = await ai.models.generateContent({ model, contents: prompt });
        const text = response?.text?.trim() || response?.outputText?.trim?.() || (response?.candidates && response.candidates[0]?.content) || "";
        if (text) pushMessage({ from: "bot", text });
      } catch (error) {
        console.error("Gemini API Error:", error);
        pushMessage({ from: "bot", text: "I've noted your selection! (Error generating dynamic response.)" });
      } finally {
        setTyping(false);
      }
    }, 300);
  }

  function handleCategorySelect(cat) {
    const newAnswers = { ...Object.fromEntries(Object.entries(answers).filter(([k]) => k === "category")), category: cat };
    setAnswers(newAnswers);
    pushMessage({ from: "user", text: cat });
    setCurrent(cat);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      pushMessage({ from: "bot", text: `Great choice! We're now customizing a **${cat}**. Please proceed with the options below.` });
    }, 400);
  }

  function handleChoice(qid, value) {
    if (value === "Other") {
      setOtherInputs((prev) => ({ ...prev, [qid]: "" }));
      return;
    }
    const newAnswers = { ...answers, [qid]: String(value) };
    setAnswers(newAnswers);
    pushMessage({ from: "user", text: `${QUESTIONS.find((q) => q.id === qid)?.text}: ${value}` });
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
    pushMessage({ from: "user", text: `${QUESTIONS.find((q) => q.id === qid)?.text}: ${text}` });
    setTyping(true);
    generateBotResponse(newAnswers);
  }

  function handleColorDraftChange(qid, field, value) {
    setColorDrafts((prev) => ({ ...prev, [qid]: { ...(prev[qid] || {}), [field]: value } }));
  }

  function saveColor(qid) {
    const draft = colorDrafts[qid] || {};
    let saved = "";
    if (draft.hex && draft.hex.startsWith("#") && draft.hex.length === 7) saved = draft.hex;
    else if (typeof draft.r !== "undefined" && typeof draft.g !== "undefined" && typeof draft.b !== "undefined") {
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
    pushMessage({ from: "user", text: `${QUESTIONS.find((q) => q.id === qid)?.text}: ${saved}` });
    setTyping(true);
    generateBotResponse(newAnswers);
  }

  function drawSpectrumProcedural(canvas) {
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");

    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;

    canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
    canvas.height = Math.max(1, Math.floor(cssHeight * dpr));

    ctx.scale(dpr, dpr);

    const width = cssWidth;
    const height = cssHeight;

    const img = ctx.createImageData(width, height);
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
    spectrumRefs.current[qid] = canvas;
    requestAnimationFrame(() => {
      drawSpectrumProcedural(canvas);
    });
  }

  function handleSpectrumClick(qid, e) {
    const canvas = spectrumRefs.current[qid];
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = Math.floor((e.clientX - rect.left) * dpr);
    const y = Math.floor((e.clientY - rect.top) * dpr);

    const ctx = canvas.getContext("2d");
    const px = Math.max(0, Math.min(canvas.width - 1, x));
    const py = Math.max(0, Math.min(canvas.height - 1, y));

    const pixel = ctx.getImageData(px, py, 1, 1).data;
    const [r, g, b] = pixel;
    const hex = rgbToHex(r, g, b);

    handleColorDraftChange(qid, "r", r);
    handleColorDraftChange(qid, "g", g);
    handleColorDraftChange(qid, "b", b);
    handleColorDraftChange(qid, "hex", hex);

    saveColor(qid);
  }

  const activeQuestions = QUESTIONS.filter((q) => {
    if (q.id === "category") return false;
    if (!q.parent) return false;
    return (answers[q.parent.id] === q.parent.value || (q.parent.id === "category" && answers["category"] === current));
  });
  const unansweredForCurrent = activeQuestions.filter((q) => !answers[q.id]);

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

  // --- Layout: single container, one column ---
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}>
      <Paper sx={{ width: "100%", maxWidth: "100%", p: 2, display: "flex", flexDirection: "column", gap: 2 }} elevation={4}>
        <Typography variant="h6">Furniture Customizer — Single Column View (AI Enabled 🤖)</Typography>

        {/* Top: Chat Area */}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1, minHeight: 260 }} elevation={0}>
          <Typography variant="subtitle2">Chat</Typography>
          <Box ref={chatRef} sx={{ flex: 1, overflowY: "auto", p: 1, bgcolor: "grey.50", borderRadius: 1 }} aria-live="polite">
            {messages?.map((m) => {
              const isUser = m.from === "user";
              return (
                <Box key={m.id} sx={{ display: "flex", mb: 1, justifyContent: isUser ? "flex-end" : "flex-start" }}>
                  {!isUser && (
                    <Avatar sx={{ bgcolor: "primary.main", width: 28, height: 28, mr: 1 }}>B</Avatar>
                  )}
                  <Paper sx={{ p: 1, maxWidth: "75%", bgcolor: isUser ? "secondary.main" : "background.paper" }}>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{typeof m.text === "string" ? m.text : JSON.stringify(m.text)}</Typography>
                  </Paper>
                  {isUser && (
                    <Avatar sx={{ bgcolor: "secondary.main", width: 28, height: 28, ml: 1 }}>U</Avatar>
                  )}
                </Box>
              );
            })}

            {typing && (
              <Box sx={{ display: "flex", py: 1 }}>
                <Typography variant="caption">Bot is typing</Typography>
                <Typography variant="caption" sx={{ ml: 1 }}>•••</Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              placeholder={unansweredForCurrent?.length ? unansweredForCurrent?.[0]?.placeholder || "Type your answer" : "Choose a category to begin"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && unansweredForCurrent?.length && (unansweredForCurrent?.[0].type === "text" || unansweredForCurrent?.[0].type === "color")) {
                  handleChatInputSubmit();
                }
              }}
              fullWidth
              size="small"
              disabled={!unansweredForCurrent?.length || (unansweredForCurrent?.[0].type !== "text" && unansweredForCurrent?.[0].type !== "color")}
            />
            <IconButton color="primary" onClick={handleChatInputSubmit} disabled={!unansweredForCurrent?.length || (unansweredForCurrent?.[0].type !== "text" && unansweredForCurrent?.[0].type !== "color")}>
              <SendIcon />
            </IconButton>
            <IconButton onClick={() => { setMessages([{ id: "bot-1", from: "bot", text: "Welcome! Let's customize your furniture. Click a category to start." }]); setAnswers({}); setCurrent(null); setInputValue(""); setOtherInputs({}); setColorDrafts({}); }}>
              <RestartAltIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Bottom: Options / Controls stacked under chat */}
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }} elevation={1}>
          <Typography variant="subtitle1">Categories & Options</Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {QUESTIONS?.find((q) => q.id === "category")?.choices?.map((cat) => (
              <Chip key={cat} label={cat} clickable color={current === cat ? "primary" : "default"} onClick={() => handleCategorySelect(cat)} />
            ))}
          </Stack>

          <Box>
            <Typography variant="subtitle2">Options for: {current || "—"}</Typography>

            {current && (
              <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                {QUESTIONS?.filter((q) => q.parent && (answers[q.parent.id] === q.parent.value || (q.parent.id === "category" && answers["category"] === current))).map((q) => (
                  <Box key={q.id}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>{q.text}</Typography>

                    {q.type === "choice" && (
                      <Grid container spacing={1} sx={{ mt: 0.5 }}>
                        {(Array.isArray(q.choices) ? q.choices : []).map((choice, idx) => {
                          const choiceObj = typeof choice === "string" ? { key: choice, label: choice, img: null } : { key: choice.key ?? choice.label, label: choice.label ?? choice.key, img: choice.img ?? null };
                          const isSelected = answers[q.id] === String(choiceObj.key) || answers[q.id] === choiceObj.label;

                          return (
                            <Grid item key={choiceObj.key} xs={6} sm={4} md={3}>
                              <OptionCard option={choiceObj} index={idx} selected={isSelected} onClick={() => handleChoice(q.id, choiceObj.key)} />
                            </Grid>
                          );
                        })}

                        <Grid item xs={12} sx={{ mt: 1 }}>
                          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            <Button size="small" variant={answers[q.id] === "Other" ? "contained" : "outlined"} onClick={() => { setOtherInputs((prev) => ({ ...prev, [q.id]: "" })); }}>Other</Button>

                            {otherInputs[q.id] !== undefined && (
                              <>
                                <TextField size="small" placeholder="Type other..." value={otherInputs[q.id] || ""} onChange={(e) => setOtherInputs((prev) => ({ ...prev, [q.id]: e.target.value }))} />
                                <Button size="small" variant="contained" onClick={() => handleOtherSave(q.id)}>Save</Button>
                              </>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    )}

                    {q.type === "text" && (
                      <TextField size="small" placeholder={q.placeholder || "Type..."} value={typeof answers[q.id] === "string" ? answers[q.id] : answers[q.id] != null ? String(answers[q.id]) : ""} onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))} onBlur={handleChatInputSubmit} fullWidth sx={{ mt: 1 }} />
                    )}

                    {q?.type === "color" && (
                      <Box sx={{ display: "flex", gap: 1, flexDirection: "column", mt: 1 }}>
                        <Typography variant="caption">Click on the spectrum below to pick a color visually</Typography>
                        <canvas style={{ width: "100%", maxWidth: 720, height: "160px" }} ref={(el) => attachSpectrumCanvas(q.id, el)} onClick={(e) => handleSpectrumClick(q.id, e)}></canvas>
                      </Box>
                    )}
                  </Box>
                ))}

                <Box>
                  <Typography variant="caption">Summary</Typography>
                  <Paper sx={{ p: 1, mt: 0.5 }}>
                    {Object.keys(answers).length === 0 ? (
                      <Typography variant="body2">No selections yet.</Typography>
                    ) : (
                      <Stack spacing={0.5}>
                        {Object.entries(answers).map(([k, v]) => (
                          <Typography key={k} variant="body2">{k}: {typeof v === "string" ? v : JSON.stringify(v)}</Typography>
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
      </Paper>
    </Box>
  );
}
