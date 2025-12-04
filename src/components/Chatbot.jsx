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

// --- Category list and per-category fields (direct lookup, no global loop) ---
// Each category's fields array contains objects { id, type, text, choices?, placeholder?, required? }
const CATEGORY_LIST = [
  "Revolving Chair",
  "Office Chair",
  "Visitor / Waiting Chair",
  "Dining / Restaurant Chair",
  "Sofa",
  "Recliner",
  "Training Chair",
  "Table",
  "Cupboard",
  "Bed",
  "Mattress",
];

const CATEGORY_FIELDS = {
  "Revolving Chair": [
    { id: "back_type", type: "choice", text: "Back type", choices: ["High", "Medium", "Low"], required: false },
    { id: "seat_material", type: "choice", text: "Seat material", choices: ["Cushion", "Mesh", "Wire"], required: false },
    { id: "upholstery", type: "choice", text: "Upholstery (if cushion)", choices: ["Fabric", "Leather", "PU"], required: false },
    { id: "base_type", type: "choice", text: "Base type", choices: ["Metal", "ABS", "Chromium"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "Click spectrum or type #rrggbb" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false }
  ],

  "Office Chair": [
    { id: "armrest", type: "choice", text: "Armrest", choices: ["With arm", "Without arm"], required: false },
    { id: "base_style", type: "choice", text: "Base style", choices: ["4-leg", "Sledge", "Wheel base"], required: false },
    { id: "seat_material", type: "choice", text: "Seat material", choices: ["Cushion", "Mesh", "Wire"], required: false },
    { id: "upholstery", type: "choice", text: "Upholstery", choices: ["Fabric", "Leather", "PU"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. #000000 or 'Black'" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false }
  ],

  "Visitor / Waiting Chair": [
    { id: "seats", type: "choice", text: "Seats (count)", choices: ["1", "2", "3"], required: false },
    { id: "frame_material", type: "choice", text: "Frame material", choices: ["SS", "MS"], required: false },
    { id: "seat_type", type: "choice", text: "Seat type", choices: ["With cushion", "Without cushion"], required: false },
    { id: "cushion_material", type: "choice", text: "Cushion material", choices: ["Leather", "Fabric", "PU"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. Grey" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false }
  ],

  "Dining / Restaurant Chair": [
    { id: "frame_material", type: "choice", text: "Frame material", choices: ["Wood", "Metal"], required: false },
    { id: "seat_type", type: "choice", text: "Seat type", choices: ["With cushion", "Without cushion"], required: false },
    { id: "seat_material", type: "choice", text: "Seat material", choices: ["Fabric", "Leather", "Suede"], required: false },
    { id: "frame_finish", type: "text", text: "Frame colour / Wood finish", placeholder: "e.g. Teak stain or Grey", required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. #ffffff" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false }
  ],

  "Sofa": [
    { id: "configuration", type: "choice", text: "Configuration", choices: ["L-unit", "Straight", "Separate"], required: false },
    { id: "material", type: "choice", text: "Material", choices: ["Fabric", "Leather", "PU"], required: false },
    { id: "seaters", type: "choice", text: "Number of seaters", choices: ["1", "2", "3", "5"], required: false },
    { id: "with_lounger", type: "choice", text: "With lounger?", choices: ["Yes", "No"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. Charcoal fabric" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false }
  ],

  "Recliner": [
    { id: "type", type: "choice", text: "Type", choices: ["Manual", "Motorized"], required: false },
    { id: "material", type: "choice", text: "Material", choices: ["Fabric", "Leather", "PU"], required: false },
    { id: "seaters", type: "choice", text: "No. of seaters", choices: ["1", "2", "3"], required: false },
    { id: "recline_features", type: "choice", text: "Recline features", choices: ["Rocking", "Gliding", "Pushback"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. Brown leather" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false }
  ],

  "Training Chair": [
    { id: "seat_back_material", type: "choice", text: "Seat/back material", choices: ["Mesh", "Cushion", "Perforated"], required: false },
    { id: "writing_pad", type: "choice", text: "Writing pad", choices: ["Full", "Half", "None"], required: false },
    { id: "wheels", type: "choice", text: "Wheels", choices: ["Yes", "No"], required: false },
    { id: "frame_material", type: "choice", text: "Frame material", choices: ["Metal", "Plastic"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. Black/Blue" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false }
  ],

  "Table": [
    { id: "table_type", type: "choice", text: "Table type", choices: ["Executive", "Office", "Computer"], required: false },
    { id: "size", type: "choice", text: "Size (preset)", choices: ["3x1.5", "3x2", "4x2", "5x2.5", "5x3", "6x3", "Custom"], required: false },
    { id: "material", type: "choice", text: "Material", choices: ["MDF", "Particle board", "Plywood", "Steel"], required: false },
    { id: "storage", type: "choice", text: "Storage", choices: ["None", "Drawer", "Cupboard"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. Laminate finish colour" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false }
  ],

  "Cupboard": [
    { id: "material", type: "choice", text: "Material", choices: ["MDF", "Particle board", "Plywood", "Hardwood"], required: false },
    { id: "size", type: "text", text: "Size (H x W x D)", placeholder: "e.g. 200x120x60 cm", required: false },
    { id: "door_type", type: "choice", text: "Door type", choices: ["Hinged", "Sliding"], required: false },
    { id: "internal_setup", type: "choice", text: "Internal setup", choices: ["Shelves", "Hanging", "Drawers"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. White laminate" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false }
  ],

  "Bed": [
    { id: "size", type: "choice", text: "Size", choices: ["Single", "Double", "Queen", "King"], required: false },
    { id: "frame_material", type: "choice", text: "Frame material", choices: ["Wood", "MDF", "Metal"], required: false },
    { id: "storage_type", type: "choice", text: "Storage type", choices: ["Drawer", "Hydraulic lift", "None"], required: false },
    { id: "headboard", type: "choice", text: "Headboard", choices: ["Padded", "Wooden", "Metal"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. Natural wood / paint colour" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false }
  ],

  "Mattress": [
    { id: "size", type: "choice", text: "Size", choices: ["Single", "Double", "Queen", "King"], required: false },
    { id: "type", type: "choice", text: "Type", choices: ["Foam", "Spring", "Hybrid", "Latex"], required: false },
    { id: "firmness", type: "choice", text: "Firmness", choices: ["Soft", "Medium", "Hard"], required: false },
    { id: "thickness", type: "choice", text: "Thickness", choices: ['6"', '8"', '10"'], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. White / grey cover" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false }
  ],
};

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
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        {img ? (
          <CardMedia
            component="img"
            image={img}
            alt={label}
            loading="lazy"
            sx={{ height: 88, objectFit: "cover" }}
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
  const chatRef = useRef();
  const spectrumRefs = useRef({});
  const generateTimeoutRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    return () => {
      // cleanup any created object URLs when component unmounts
      Object.values(attachments).forEach((a) => {
        if (a?.previewUrl) URL.revokeObjectURL(a.previewUrl);
      });
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
      const config = Object.entries(currentAnswers)
        .map(([key, value]) => {
          // Try to find field label from CATEGORY_FIELDS[current] if available
          let label = key;
          const fields = current ? CATEGORY_FIELDS[current] || [] : [];
          const f = fields.find((x) => x.id === key);
          if (f) label = f.text;
          return `${label}: ${value}`;
        })
        .join("\n");

      const prompt = `You are an expert furniture customization assistant. The user is configuring a piece of furniture. Their current configuration is:\n\n---\n${config}\n---\n\nBased on this, provide a concise, friendly, and encouraging acknowledgment of the latest choice, and perhaps a subtle design suggestion or an interesting fact about their chosen configuration. DO NOT ask the next question, just provide conversational feedback. Keep the response to 1-2 short sentences.`;

      try {
        const response = await ai.models.generateContent({
          model,
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

    // create preview for images
    const previewUrl = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;

    setAttachments((prev) => ({ ...prev, [fieldId]: { file, previewUrl } }));

    // store a human-friendly marker in answers so summary/AI show filename
    const newAnswers = { ...answers, [`${fieldId}_attachment`]: file.name };
    setAnswers(newAnswers);

    // push chat note and trigger AI response
    pushMessage({ from: "user", text: `${file.name} (attached for ${fieldId})` });
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
    // reset answers except retain category
    const newAnswers = { category: cat };
    setAnswers(newAnswers);
    pushMessage({ from: "user", text: cat });
    setCurrent(cat);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      pushMessage({
        from: "bot",
        text: `Great choice! We're now customizing a **${cat}**. Please proceed with the options below.`,
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
    // attempt to get field label
    const fieldLabel = current ? (CATEGORY_FIELDS[current] || []).find((f) => f.id === fieldId)?.text : fieldId;
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
    const fieldLabel = current ? (CATEGORY_FIELDS[current] || []).find((f) => f.id === fieldId)?.text : fieldId;
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
    if (draft.hex && draft.hex.startsWith("#") && draft.hex.length === 7) saved = draft.hex;
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
    const fieldLabel = current ? (CATEGORY_FIELDS[current] || []).find((f) => f.id === fieldId)?.text : fieldId;
    pushMessage({
      from: "user",
      text: `${fieldLabel || fieldId}: ${saved}`,
    });
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

  function attachSpectrumCanvas(fieldId, canvas) {
    if (!canvas) return;
    spectrumRefs.current[fieldId] = canvas;
    requestAnimationFrame(() => {
      drawSpectrumProcedural(canvas);
    });
  }

  function handleSpectrumClick(fieldId, e) {
    const canvas = spectrumRefs.current[fieldId];
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

    handleColorDraftChange(fieldId, "r", r);
    handleColorDraftChange(fieldId, "g", g);
    handleColorDraftChange(fieldId, "b", b);
    handleColorDraftChange(fieldId, "hex", hex);

    saveColor(fieldId);
  }

  // Get fields for current category (direct lookup, no global loop)
  const fieldsForCurrent = current ? CATEGORY_FIELDS[current] || [] : [];

  // Unanswered required fields for the current category
  const unansweredForCurrent = fieldsForCurrent.filter((f) => f.required && !answers[f.id]);

 const handleChatInputSubmit = () => {
  const text = inputValue.trim();
  if (!text) return;

  // Always treat user input as casual chat (no auto-fill of fields)
  pushMessage({ from: "user", text });
  setInputValue("");

  // Include current answers so the AI can reference them if desired
  const payload = { ...answers, note: text, category: current || answers.category };

  setTyping(true);
  generateBotResponse(payload);
};



  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          maxWidth: "100%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        elevation={4}
      >
        <Typography variant="h6">Furniture Customizer — Single Column View (AI Enabled 🤖)</Typography>

        {/* Top: Chat Area */}
        <Grid container>
          <Grid container size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 1,
                bgcolor: "grey.50",
                borderRadius: 1,
                minWidth: "100%",
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
                  minWidth: "100%",
                  maxHeight: 500,
                  minHeight: 500,
                }}
                aria-live="polite"
              >
                {messages?.map((m) => {
                  const isUser = m.from === "user";
                  const hexMatch = m.text?.match(/#([0-9a-fA-F]{6})/);
                  const previewColor = hexMatch ? hexMatch[0] : null;

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

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
  <TextField
    placeholder={current ? `Answer for "${current}"...` : "Type your message..."}
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleChatInputSubmit();
      }
    }}
    fullWidth
    size="small"
    // always enabled as a common chat input
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
    }}
  >
    <RestartAltIcon />
  </IconButton>
</Box>

            </Paper>
          </Grid>

          {/* Bottom: Options / Controls stacked under chat */}
          <Grid container size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, maxHeight: 600, overflowY: "auto" }} elevation={1}>
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
                          {f.text} {f.required ? <Typography component="span" sx={{ color: "error.main" }}> *</Typography> : null}
                        </Typography>

                        {f.type === "choice" && (
                          <Grid container spacing={1} sx={{ mt: 0.5 }}>
                            {(Array.isArray(f.choices) ? f.choices : []).map((choice, idx) => {
                              const choiceObj = typeof choice === "string" ? { key: choice, label: choice, img: null } : { key: choice.key ?? choice.label, label: choice.label ?? choice.key, img: choice.img ?? null };
                              const isSelected = answers[f.id] === String(choiceObj.key) || answers[f.id] === choiceObj.label;

                              return (
                                <Grid item key={choiceObj.key} xs={6} sm={4} md={3}>
                                  <OptionCard option={choiceObj} index={idx} selected={isSelected} onClick={() => handleChoice(f.id, choiceObj.key)} />
                                </Grid>
                              );
                            })}

                            <Grid container size={{ xs: 12, md: 12 }} sx={{ mt: 1 }}>
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
                                    <TextField size="small" placeholder="Type other..." value={otherInputs[f.id] || ""} onChange={(e) => setOtherInputs((prev) => ({ ...prev, [f.id]: e.target.value }))} />
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
                            onChange={(e) => setAnswers((prev) => ({ ...prev, [f.id]: e.target.value }))}
                            onBlur={() => {
                              // auto-save text fields
                              const val = (answers[f.id] || "").toString().trim();
                              if (val) {
                                generateBotResponse({ ...answers, [f.id]: val });
                              }
                            }}
                            fullWidth
                            sx={{ mt: 1 }}
                          />
                        )}

                        {f.type === "color" && (
                          <Box sx={{ display: "flex", gap: 1, flexDirection: "column", mt: 1 }}>
                            <Typography variant="caption">Click on the spectrum below to pick a color visually</Typography>
                            <canvas style={{ width: "100%", maxWidth: 720, height: "160px" }} ref={(el) => attachSpectrumCanvas(f.id, el)} onClick={(e) => handleSpectrumClick(f.id, e)} />
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
                                  // save immediately when valid hex
                                  saveColor(f.id);
                                }
                              }}
                              onBlur={() => {
                                // if user typed a hex and it's valid, save it
                                const v = colorDrafts[f.id]?.hex || "";
                                const parsed = normalizeHexInput(v);
                                if (parsed) saveColor(f.id);
                              }}
                              sx={{ mt: 1 }}
                            />
                          </Box>
                        )}
{/* //............................File Handling.........................................................// */}
                        {f.type === "file" && (
                          <>
                            {/* hidden file input */}
                            <input
                              id={`file-${f.id}`}
                              type="file"
                              accept="image/*,.pdf"
                              style={{ display: "none" }}
                              onChange={(e) => handleFileUpload(f.id, e)}
                            />

                            {/* Reuse OptionCard for consistent look */}
                            <Box
                              onClick={() => {
                                const el = document.getElementById(`file-${f.id}`);
                                if (el) el.click();
                              }}
                            >
                              <OptionCard
                                option={{
                                  key: "__reference__", // internal key
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

                            {/* show file name + remove */}
                            {attachments[f.id] && (
                              <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                                {attachments[f.id].previewUrl && (
                                  <img
                                    src={attachments[f.id].previewUrl}
                                    alt="preview"
                                    style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 6, border: "1px solid #ccc" }}
                                  />
                                )}
                                <Typography variant="caption" sx={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {attachments[f.id].file.name}
                                </Typography>
                                <Button size="small" color="error" onClick={() => removeAttachment(f.id)}>
                                  Remove
                                </Button>
                              </Box>
                            )}
                          </>
                        )}
     {/* //............................File Handling.........................................................// */}







                      </Box>
                    ))}

                    <Box>
                      <Typography variant="caption">Summary</Typography>
                      <Paper sx={{ p: 1, mt: 0.5 }}>
                        {Object.keys(answers).length === 0 ? (
                          <Typography variant="body2">No selections yet.</Typography>
                        ) : (
                          <Stack spacing={0.5}>
                            {fieldsForCurrent.map((f) => {
                              const v = answers[f.id];
                              return (
                                <Typography key={f.id} variant="body2" display={"flex"}>
                                  {f.text}:{" "}
                                  {f.required && !v ? (
                                    <Box sx={{ color: "error.main", ml: 1 }}>Missing required</Box>
                                  ) : (
                                    <>
                                      {v?.split && v?.split("#")[1] && (
                                        <Box sx={{ bgcolor: `#${v?.split("#")[1]}`, minWidth: 60, height: 25, borderRadius: 2, ml: 1, mr: 1 }} />
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
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
