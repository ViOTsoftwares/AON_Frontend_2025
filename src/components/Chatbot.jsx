// src/components/FurnitureCustomizationChatbotSingleColumn.jsx
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
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import about2 from "../assets/about2.jpg";

// Import the Google Gen AI SDK (if using client-side—prefer server-side)
import { GoogleGenAI } from "@google/genai";

// --- CONFIG / IMAGE PATH ---
// const EXAMPLE_IMG = "/mnt/data/WhatsApp Image 2025-11-25 at 14.27.56.jpeg";
// (left as example; not used. Remove if unnecessary.)

// IMPORTANT: never hard-code API keys in client code for production.
// Use an env var in development and move calls server-side for real deployments.
const API_KEY =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_GENAI_KEY) ||
  "";

// Ensure CATEGORY_FIELDS is defined or imported in your app.
// Replace the import path below with your actual location / export.
// top of file - replace your single import line
import CATEGORY_FIELDS, { CATEGORY_LIST } from "../components/categoryFields";
 // <-- adjust or define this
// If you don't have a file, create it that exports the CATEGORY_FIELDS object.

/* ---------- unchanged utility functions (with no logic change) ---------- */

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

// sanitize string for filenames / folders
function norm(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/["'()]/g, "")
    .replace(/[^a-z0-9_\-]/g, "");
}

/**
 * imgFor(categoryName, fieldId, choiceKey, ext)
 */
function imgFor(categoryName, fieldId, choiceKey, ext = "jpg") {
  const cat = norm(categoryName);
  const field = norm(fieldId);
  const choice = norm(choiceKey);
  return `/ChatOptions/${cat}/${field}__${choice}.${ext}`;
}

/**
 * augmentCategoryFieldsWithImages(orig, options)
 */
function augmentCategoryFieldsWithImages(orig, options = {}) {
  const { imgExt = "jpg" } = options;
  const out = {};

  Object.entries(orig).forEach(([categoryName, fields]) => {
    out[categoryName] = (fields || []).map((f) => {
      const copy = { ...f };
      if (Array.isArray(f.choices)) {
        copy.choices = f.choices.map((choice) => {
          if (typeof choice === "string") {
            const key = choice;
            const label = choice;
            const img = imgFor(categoryName, f.id, key, imgExt);
            return { key, label, img };
          } else if (choice && typeof choice === "object") {
            const key = choice.key ?? choice.label;
            const label = choice.label ?? choice.key;
            const img = choice.img ?? imgFor(categoryName, f.id, key, imgExt);
            return { ...choice, key, label, img };
          } else return choice;
        });
      }
      return copy;
    });
  });

  return out;
}

// create augmented lookup once at module-level
const CATEGORY_FIELDS_WITH_IMAGES = augmentCategoryFieldsWithImages(
  CATEGORY_FIELDS,
  { imgExt: "jpg" }
);



// --- OptionCard (unchanged) ---
function OptionCard({ option, selected, onClick, index }) {
  const label =
    typeof option === "string" ? option : option.label || option.key;
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
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        {img ? (
          <CardMedia
  component="img"
  image={img}
  alt={label}
  loading="lazy"
  onError={(e) => {
    const imgEl = e.currentTarget;

    // first time error → try common folder
    if (!imgEl.dataset.fallbackTried) {
      imgEl.dataset.fallbackTried = "1";
      imgEl.src = `/images/common/${norm(label)}.jpg`;
      return;
    }

    // second time error → final fallback & stop further errors
    imgEl.onerror = null;
    imgEl.src = about2; // imported at top
  }}
  sx={{ height: 88, objectFit: "contain" }}
/>

        ) : (
          <Box
            sx={{
              height: 88,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.100",
            }}
          >
            <Typography variant="caption">No image</Typography>
          </Box>
        )}

        <CardContent sx={{ p: 1 }}>
          <Typography variant="body2" align="center" noWrap>
            {label}
          </Typography>
        </CardContent>

        <Box
          sx={{
            position: "absolute",
            top: 6,
            left: 6,
            width: 22,
            height: 22,
            borderRadius: "50%",
            bgcolor: selected ? "primary.main" : "grey.300",
            color: selected ? "primary.contrastText" : "text.primary",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.7rem",
            pointerEvents: "none",
          }}
        >
          {index + 1}
        </Box>

        {selected && (
          <CheckCircleIcon
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              color: "primary.main",
              bgcolor: "background.paper",
              borderRadius: "50%",
            }}
            fontSize="small"
          />
        )}
      </CardActionArea>
    </Card>
  );
}

// --- Component ---
export default function FurnitureCustomizationChatbotSingleColumn() {
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
  const [attachments, setAttachments] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [finished, setFinished] = useState(false);


  const chatRef = useRef();
  const spectrumRefs = useRef({});
  const generateTimeoutRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    return () => {
      Object.values(attachments).forEach((a) => {
        if (a?.previewUrl) URL.revokeObjectURL(a.previewUrl);
      });
      if (generateTimeoutRef.current) {
        clearTimeout(generateTimeoutRef.current);
      }
    };
  }, [attachments]);

  function pushMessage(msg) {
    const from = msg && msg.from ? msg.from : "bot";
    const raw = Object.prototype.hasOwnProperty.call(msg || {}, "text")
      ? msg.text
      : "";
    const text =
      raw == null ? "" : typeof raw === "string" ? raw : JSON.stringify(raw);
    setMessages((prev) => [...prev, { id: `${from}-${Date.now()}`, from, text }]);
  }

  async function generateBotResponse(currentAnswers) {
    if (!API_KEY) {
      setTyping(false);
      pushMessage({
        from: "bot",
        text: "Noted. (AI disabled — no API key configured on the client.)",
      });
      return;
    }

    if (generateTimeoutRef.current) clearTimeout(generateTimeoutRef.current);
    setTyping(true);

    generateTimeoutRef.current = setTimeout(async () => {
      const config = Object.entries(currentAnswers || {})
        .map(([key, value]) => {
          let label = key;
          const fields = current ? CATEGORY_FIELDS[current] || [] : [];
          const f = fields.find((x) => x.id === key);
          if (f) label = f.text;
          return `${label}: ${value}`;
        })
        .join("\n");

      const prompt = `You are an expert furniture customization assistant. The user is configuring a piece of furniture. Their current configuration is:\n\n---\n${config}\n---\n\nBased on this, provide a concise, friendly, and encouraging acknowledgment of the latest choice, and perhaps a subtle design suggestion or an interesting fact about their chosen configuration. DO NOT ask the next question, just provide conversational feedback. Keep the response to 1-2 short sentences.`;

      try {
        // NOTE: It's strongly recommended to make AI calls server-side to protect API keys.
        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        const text =
          response?.text?.trim() ||
          response?.outputText?.trim?.() ||
          (response?.candidates && response.candidates[0]?.content) ||
          "";
        if (text) pushMessage({ from: "bot", text });
      } catch (error) {
        console.error("Gemini API Error:", error);
        pushMessage({
          from: "bot",
          text: "I've noted your selection! (Error generating dynamic response.)",
        });
      } finally {
        setTyping(false);
      }
    }, 300);
  }

  function handleFileUpload(fieldId, e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const previewUrl = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : null;

    setAttachments((prev) => ({ ...prev, [fieldId]: { file, previewUrl } }));

    const newAnswers = { ...answers, [`${fieldId}_attachment`]: file.name };
    setAnswers(newAnswers);

    pushMessage({
      from: "user",
      text: `${file.name} (attached for ${fieldId})`,
    });
    setTyping(true);
    generateBotResponse(newAnswers);
  }

  function removeAttachment(fieldId) {
    const item = attachments[fieldId];
    if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);

    setAttachments((prev) => {
      const copy = { ...prev };
      delete copy[fieldId];
      return copy;
    });

    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[`${fieldId}_attachment`];
      return copy;
    });
  }

  function handleCategorySelect(cat) {
    const newAnswers = { category: cat };
    setAnswers(newAnswers);
    pushMessage({ from: "user", text: cat });
    setCurrent(cat);
    setTyping(true);
    setFinished(false);
    setTimeout(() => {
      setTyping(false);
      pushMessage({
        from: "bot",
        text: `Great choice! We're now customizing a ${cat}. Please proceed with the options below.`,
      });
    }, 400);
  }

  function handleChoice(fieldId, value) {
    if (value === "Other") {
      setOtherInputs((prev) => ({ ...prev, [fieldId]: "" }));
      return;
    }
    const newAnswers = { ...answers, [fieldId]: String(value) };
    setAnswers(newAnswers);
    const fieldLabel = current
      ? (CATEGORY_FIELDS[current] || []).find((f) => f.id === fieldId)?.text
      : fieldId;
    pushMessage({
      from: "user",
      text: `${fieldLabel || fieldId}: ${value}`,
    });
    setTyping(true);
    generateBotResponse(newAnswers);
  }

  function handleOtherSave(fieldId) {
    const text = (otherInputs[fieldId] || "").trim();
    if (!text) return;
    const newAnswers = { ...answers, [fieldId]: `Other: ${text}` };
    setAnswers(newAnswers);
    setOtherInputs((prev) => {
      const c = { ...prev };
      delete c[fieldId];
      return c;
    });
    const fieldLabel = current
      ? (CATEGORY_FIELDS[current] || []).find((f) => f.id === fieldId)?.text
      : fieldId;
    pushMessage({
      from: "user",
      text: `${fieldLabel || fieldId}: ${text}`,
    });
    setTyping(true);
    generateBotResponse(newAnswers);
  }

  function handleColorDraftChange(fieldId, field, value) {
    setColorDrafts((prev) => ({
      ...prev,
      [fieldId]: { ...(prev[fieldId] || {}), [field]: value },
    }));
  }

  function saveColor(fieldId) {
    const draft = colorDrafts[fieldId] || {};
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
    const newAnswers = { ...answers, [fieldId]: String(saved) };
    setAnswers(newAnswers);
    const fieldLabel = current
      ? (CATEGORY_FIELDS[current] || []).find((f) => f.id === fieldId)?.text
      : fieldId;
    pushMessage({
      from: "user",
      text: `${fieldLabel || fieldId}: ${saved}`,
    });
    setTyping(true);
    generateBotResponse(newAnswers);
  }

  /* ---------- Spectrum drawing: fixed for DPR / pixel buffer ---------- */
  function drawSpectrumProcedural(canvas) {
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth || 300;
    const cssHeight = canvas.clientHeight || 150;

    // pixel dimensions for the backing store
    const pixelWidth = Math.max(1, Math.floor(cssWidth * dpr));
    const pixelHeight = Math.max(1, Math.floor(cssHeight * dpr));

    canvas.width = pixelWidth;
    canvas.height = pixelHeight;

    const ctx = canvas.getContext("2d");
    // create pixel-sized imageData
    const img = ctx.createImageData(pixelWidth, pixelHeight);
    let p = 0;

    for (let y = 0; y < pixelHeight; y++) {
      const v = 1 - y / (pixelHeight - 1);
      for (let x = 0; x < pixelWidth; x++) {
        const h = (x / (pixelWidth - 1)) * 360;
        const s = 1;
        const [r, g, b] = hsvToRgb(h, s, v);

        img.data[p++] = r;
        img.data[p++] = g;
        img.data[p++] = b;
        img.data[p++] = 255;
      }
    }

    ctx.putImageData(img, 0, 0);

    // Keep the CSS size; canvas has pixel backing store already.
    canvas.style.width = cssWidth + "px";
    canvas.style.height = cssHeight + "px";
  }

  function attachSpectrumCanvas(fieldId, canvas) {
    if (!canvas) return;
    spectrumRefs.current[fieldId] = canvas;
    requestAnimationFrame(() => {
      drawSpectrumProcedural(canvas);
    });
    // redraw on resize for safety
    const observer = new ResizeObserver(() => drawSpectrumProcedural(canvas));
    observer.observe(canvas);
    // store observer so it can be cleaned up if needed later (not implemented here)
  }

  function handleSpectrumClick(fieldId, e) {
    const canvas = spectrumRefs.current[fieldId];
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    // Map mouse coordinates to pixel-backed canvas coordinates
    const canvasPixelWidth = canvas.width;
    const canvasPixelHeight = canvas.height;

    const px = Math.floor(((e.clientX - rect.left) / rect.width) * canvasPixelWidth);
    const py = Math.floor(((e.clientY - rect.top) / rect.height) * canvasPixelHeight);

    const ctx = canvas.getContext("2d");
    const clampedX = Math.max(0, Math.min(canvasPixelWidth - 1, px));
    const clampedY = Math.max(0, Math.min(canvasPixelHeight - 1, py));

    const pixel = ctx.getImageData(clampedX, clampedY, 1, 1).data;
    const [r, g, b] = pixel;
    const hex = rgbToHex(r, g, b);

    handleColorDraftChange(fieldId, "r", r);
    handleColorDraftChange(fieldId, "g", g);
    handleColorDraftChange(fieldId, "b", b);
    handleColorDraftChange(fieldId, "hex", hex);

    saveColor(fieldId);
  }

  // Get fields for current category (direct lookup, no global loop)
  // use augmented fields so each choice has an `img` URL
  const fieldsForCurrent = current ? CATEGORY_FIELDS_WITH_IMAGES[current] || [] : [];

  const handleChatInputSubmit = () => {
    const text = inputValue.trim();
    if (!text) return;

    pushMessage({ from: "user", text });
    setInputValue("");

    const payload = {
      ...answers,
      note: text,
      category: current || answers.category,
    };

    setTyping(true);
    generateBotResponse(payload);
  };

  // ---- submitCustomization from file 1 ----
  async function submitCustomization() {


    console.log("FINAL ANSWERS =>", answers);

    // must have category
    if (!answers?.category && !current) {
      pushMessage({
        from: "bot",
        text: "Please choose a category before submitting.",
      });
      return;
    }

    // removed shadowing: use the top-level fieldsForCurrent
    const requiredMissing = (fieldsForCurrent || [])
      .filter((f) => f.required)
      .filter((f) => !answers[f.id] && !attachments[f.id]);

    if (requiredMissing.length > 0) {
      const list = requiredMissing.map((f) => f.text).join(", ");
      pushMessage({
        from: "bot",
        text: `Please fill required fields: ${list}`,
      });
      return;
    }

    try {
      setSubmitting(true);

      const fd = new FormData();
      fd.append("payload", JSON.stringify(answers));

      Object.entries(attachments).forEach(([fieldId, item]) => {
        if (item?.file) {
          fd.append(fieldId, item.file, item.file.name);
        }
      });

      const res = await fetch("/api/customize", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Server returned ${res.status}`);
      }

      let json = null;
      try {
        json = await res.json();
      } catch (e) {}

      pushMessage({
        from: "bot",
        text: "Customisation submitted successfully! 🎉",
      });
      setFinished(true);

      if (json?.message) pushMessage({ from: "bot", text: json.message });
    } catch (err) {
      console.error("Submit error:", err);
      pushMessage({
        from: "bot",
        text: `Submission failed: ${err.message || err}`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}>
      {/* LEFT: Chat area */}
      <Paper
        sx={{
          display: { xs: "none", md: "flex" }, // hidden on xs, visible on md+
          width: { xs: "0%", md: "48%" },
          maxWidth: { xs: "0%", md: "48%" },
          p: 2,
          flexDirection: "column",
          gap: 2,
        }}
        elevation={4}
      >
        <Typography variant="h6">Furniture Customizer — Chat (AI Enabled 🤖)</Typography>

        <Paper
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 1,
            bgcolor: "grey.50",
            borderRadius: 1,
            minHeight: 500,
          }}
          elevation={0}
        >
          <Typography variant="subtitle2">Chat</Typography>

          <Box
            ref={chatRef}
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 1,
              bgcolor: "grey.50",
              borderRadius: 1,
              maxHeight: 500,
              minHeight: 500,
            }}
            aria-live="polite"
          >
            {messages?.map((m) => {
              const isUser = m.from === "user";
              const v = m.text;
              // robust color preview detection:
              const hexMatch = typeof v === "string" && v.includes("#") ? `#${String(v).split("#")[1].slice(0, 6)}` : null;
              const previewColor = hexMatch && /^#[0-9a-fA-F]{6}$/.test(hexMatch) ? hexMatch : null;

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
                    <Avatar sx={{ bgcolor: "primary.main", width: 28, height: 28, mr: 1 }}>
                      B
                    </Avatar>
                  )}

                  <Paper sx={{ p: 1, maxWidth: "75%", bgcolor: isUser ? "#f2f2f2" : "background.paper" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {isUser && previewColor && (
                        <Box sx={{ bgcolor: previewColor, minWidth: 60, height: 25, borderRadius: 2, mb: 0.5 }} />
                      )}
                      <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                        {typeof m.text === "string" ? m.text : JSON.stringify(m.text)}
                      </Typography>
                    </Box>
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
                <Typography variant="caption" sx={{ ml: 1 }}>
                  •••
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1 }}>
            <TextField
              placeholder={current ? `Answer for "${current}"...` : "Type your message..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleChatInputSubmit();
              }}
              fullWidth
              size="small"
            />
            <IconButton color="primary" onClick={handleChatInputSubmit}>
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
                setAttachments({});
                setFinished(false);
                setSubmitting(false);
              }}
            >
              <RestartAltIcon />
            </IconButton>
          </Box>
        </Paper>
      </Paper>

      {/* RIGHT: Options column */}
      <Paper
        sx={{
          width: { xs: "100%", md: "48%" },
          maxWidth: { xs: "100%", md: "48%" },
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxHeight: 600,
          overflowY: "auto",
        }}
        elevation={1}
      >
        <Typography variant="subtitle1">Categories & Options</Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {CATEGORY_LIST.map((cat) => (
            <Chip key={cat} label={cat} clickable color={current === cat ? "primary" : "default"} onClick={() => handleCategorySelect(cat)} />
          ))}
        </Stack>

        <Box>
          <Typography variant="subtitle2">Options for: {current || "—"}</Typography>

          {current && (
            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              {fieldsForCurrent.map((f) => (
                <Box key={f.id}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {f.text}{" "}
                    {f.required ? (
                      <Typography component="span" sx={{ color: "error.main" }}>
                        *
                      </Typography>
                    ) : null}
                  </Typography>

                  {f.type === "choice" && (
                    <Grid container spacing={1} sx={{ mt: 0.5 }}>
                      {(Array.isArray(f.choices) ? f.choices : []).map((choice, idx) => {
                        const choiceObj =
                          typeof choice === "string"
                            ? { key: choice, label: choice, img: null }
                            : {
                                key: choice.key ?? choice.label,
                                label: choice.label ?? choice.key,
                                img: choice.img ?? null,
                              };
                        const isSelected = answers[f.id] === String(choiceObj.key) || answers[f.id] === choiceObj.label;

                        return (
                          <Grid item key={choiceObj.key} xs={6} sm={4} md={3}>
                            <OptionCard option={choiceObj} index={idx} selected={isSelected} onClick={() => handleChoice(f.id, choiceObj.key)} />
                          </Grid>
                        );
                      })}

                      {/* OTHER INPUT BUTTON + FIELD */}
                      <Grid item xs={12} sx={{ mt: 1 }}>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Button
                            size="small"
                            variant={answers[f.id] === "Other" ? "contained" : "outlined"}
                            onClick={() => {
                              setOtherInputs((prev) => ({ ...prev, [f.id]: "" }));
                            }}
                          >
                            Other
                          </Button>

                          {otherInputs[f.id] !== undefined && (
                            <>
                              <TextField
                                size="small"
                                placeholder="Type other..."
                                value={otherInputs[f.id] || ""}
                                onChange={(e) => setOtherInputs((prev) => ({ ...prev, [f.id]: e.target.value }))}
                              />
                              <Button size="small" variant="contained" onClick={() => handleOtherSave(f.id)}>
                                Save
                              </Button>
                            </>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  )}

                  {f.type === "text" && (
                    <TextField
                      size="small"
                      placeholder={f.placeholder || "Type..."}
                      value={typeof answers[f.id] === "string" ? answers[f.id] : answers[f.id] != null ? String(answers[f.id]) : ""}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [f.id]: e.target.value,
                        }))
                      }
                      onBlur={() => {
                        const val = (answers[f.id] || "").toString().trim();
                        if (val) {
                          generateBotResponse({
                            ...answers,
                            [f.id]: val,
                          });
                        }
                      }}
                      fullWidth
                      sx={{ mt: 1 }}
                    />
                  )}

                  {f.type === "color" && (
                    <Box sx={{ display: "flex", gap: 1, flexDirection: "column", mt: 1 }}>
                      <Typography variant="caption">Click on the spectrum below to pick a color visually</Typography>

                      <canvas
                        style={{
                          width: "100%",
                          maxWidth: 720,
                          height: "160px",
                        }}
                        ref={(el) => attachSpectrumCanvas(f.id, el)}
                        onClick={(e) => handleSpectrumClick(f.id, e)}
                      />

                      <TextField
                        size="small"
                        placeholder={f.placeholder || "#rrggbb"}
                        value={typeof answers[f.id] === "string" ? answers[f.id] : colorDrafts[f.id]?.hex || ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          handleColorDraftChange(f.id, "hex", v);
                          const rgb = hexToRgb(v);
                          if (rgb) {
                            handleColorDraftChange(f.id, "r", rgb.r);
                            handleColorDraftChange(f.id, "g", rgb.g);
                            handleColorDraftChange(f.id, "b", rgb.b);
                            saveColor(f.id);
                          }
                        }}
                        onBlur={() => {
                          const v = colorDrafts[f.id]?.hex || "";
                          const parsed = normalizeHexInput(v);
                          if (parsed) saveColor(f.id);
                        }}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  )}

                  {f.type === "file" && (
                    <>
                      <input id={`file-${f.id}`} type="file" accept="image/*,.pdf" style={{ display: "none" }} onChange={(e) => handleFileUpload(f.id, e)} />

                      <Box
                        onClick={() => {
                          const el = document.getElementById(`file-${f.id}`);
                          if (el) el.click();
                        }}
                      >
                        <OptionCard
                          option={{
                            key: "__reference__",
                            label: f.label || "Upload reference",
                            img: attachments[f.id]?.previewUrl || null,
                          }}
                          index={0}
                          selected={Boolean(attachments[f.id])}
                          onClick={() => {
                            const el = document.getElementById(`file-${f.id}`);
                            if (el) el.click();
                          }}
                        />
                      </Box>

                      {attachments[f.id] && (
                        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                          {attachments[f.id].previewUrl && (
                            <img
                              src={attachments[f.id].previewUrl}
                              alt="preview"
                              style={{
                                width: 70,
                                height: 70,
                                objectFit: "cover",
                                borderRadius: 6,
                                border: "1px solid #ccc",
                              }}
                            />
                          )}
                          <Typography
                            variant="caption"
                            sx={{
                              maxWidth: 180,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {attachments[f.id].file.name}
                          </Typography>
                          <Button size="small" color="error" onClick={() => removeAttachment(f.id)}>
                            Remove
                          </Button>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              ))}

              {/* SUMMARY SECTION */}
              <Box>
                <Typography variant="caption">Summary</Typography>
                <Paper sx={{ p: 1, mt: 0.5 }}>
                  {Object.keys(answers).length === 0 ? (
                    <Typography variant="body2">No selections yet.</Typography>
                  ) : (
                    <Stack spacing={0.5}>
                      {fieldsForCurrent.map((f) => {
                        const v = answers[f.id];
                        const hexCandidate =
                          typeof v === "string" && v.includes("#") ? `#${String(v).split("#")[1].slice(0, 6)}` : null;
                        const isHex = hexCandidate && /^#[0-9a-fA-F]{6}$/.test(hexCandidate);

                        return (
                          <Typography key={f.id} variant="body2" display={"flex"}>
                            {f.text}:{" "}
                            {f.required && !v ? (
                              <Box sx={{ color: "error.main", ml: 1 }}>Missing required</Box>
                            ) : (
                              <>
                                {isHex && (
                                  <Box
                                    sx={{
                                      bgcolor: `${hexCandidate}`,
                                      minWidth: 60,
                                      height: 25,
                                      borderRadius: 2,
                                      ml: 1,
                                      mr: 1,
                                    }}
                                  />
                                )}
                                {typeof v === "string" ? v : v ? JSON.stringify(v) : "-"}
                              </>
                            )}
                          </Typography>
                        );
                      })}
                    </Stack>
                  )}
                </Paper>
              </Box>

              {/* FINALIZE SECTION */}
              <Box sx={{ mt: 2, display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
                <Button variant="contained" onClick={submitCustomization} disabled={submitting || finished}>
                  {submitting ? "Submitting..." : finished ? "Submitted" : "Finalize & Submit"}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => {
                    const missing = (fieldsForCurrent || []).filter((f) => f.required && !answers[f.id] && !attachments[f.id]);
                    if (missing.length === 0)
                      pushMessage({
                        from: "bot",
                        text: "Looks good — you can finalize now.",
                      });
                    else
                      pushMessage({
                        from: "bot",
                        text: "Missing: " + missing.map((m) => m.text).join(", "),
                      });
                  }}
                >
                  Validate
                </Button>

                {finished && (
                  <Chip icon={<CheckCircleIcon />} label="Finished" color="success" sx={{ ml: 1 }} />
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
