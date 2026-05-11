// categoryFields.js
// Updated exactly with the data you provided.

export const CATEGORY_LIST = [
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
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false },
  ],

  "Office Chair": [
    { id: "armrest", type: "choice", text: "Armrest", choices: ["With arm", "Without arm"], required: false },
    { id: "base_style", type: "choice", text: "Base style", choices: ["4-leg", "Sledge", "Wheel base"], required: false },
    { id: "seat_material", type: "choice", text: "Seat material", choices: ["Cushion", "Mesh", "Wire"], required: false },
    { id: "upholstery", type: "choice", text: "Uphholstery", choices: ["Cotton Fabric", "Faux Leather", " Genuine Leather ", "Polyester fabric"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. #000000 or 'Black'" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false },
  ],

  "Visitor / Waiting Chair": [
    { id: "seats", type: "choice", text: "Seats (count)", choices: ["1", "2", "3"], required: false },
    { id: "frame_material", type: "choice", text: "Frame material", choices: ["SS", "MS"], required: false },
    { id: "seat_type", type: "choice", text: "Seat type", choices: ["With cushion", "Without cushion"], required: false },
    { id: "cushion_material", type: "choice", text: "Cushion material", choices: ["Leather", "Fabric", "PU"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. Grey" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false },
  ],

  "Dining / Restaurant Chair": [
    { id: "frame_material", type: "choice", text: "Frame material", choices: ["Wood", "Metal"], required: false },
    { id: "seat_type", type: "choice", text: "Seat type", choices: ["With cushion", "Without cushion"], required: false },
    { id: "seat_material", type: "choice", text: "Seat material", choices: ["Fabric", "Leather", "Suede"], required: false },
    { id: "frame_finish", type: "text", text: "Frame colour / Wood finish", placeholder: "e.g. Teak stain or Grey", required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. #ffffff" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false },
  ],

  "Sofa": [
    { id: "configuration", type: "choice", text: "Configuration", choices: ["L-unit", "Straight", "Separate"], required: false },
    { id: "material", type: "choice", text: "Material", choices: ["Fabric", "Leather", "PU"], required: false },
    { id: "seaters", type: "choice", text: "Number of seaters", choices: ["1", "2", "3", "5"], required: false },
    { id: "with_lounger", type: "choice", text: "With lounger?", choices: ["Yes", "No"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. Charcoal fabric" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false },
  ],

  "Recliner": [
    { id: "type", type: "choice", text: "Type", choices: ["Manual", "Motorized"], required: false },
    { id: "material", type: "choice", text: "Material", choices: ["Fabric", "Leather", "PU"], required: false },
    { id: "seaters", type: "choice", text: "No. of seaters", choices: ["1", "2", "3"], required: false },
    { id: "recline_features", type: "choice", text: "Recline features", choices: ["Rocking", "Gliding", "Pushback"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. Brown leather" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false },
  ],

  "Training Chair": [
    { id: "seat_back_material", type: "choice", text: "Seat/back material", choices: ["Mesh", "Cushion", "Perforated"], required: false },
    { id: "writing_pad", type: "choice", text: "Writing pad", choices: ["Full", "Half", "None"], required: false },
    { id: "wheels", type: "choice", text: "Wheels", choices: ["Yes", "No"], required: false },
    { id: "frame_material", type: "choice", text: "Frame material", choices: ["Metal", "Plastic"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. Black/Blue" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false },
  ],

  "Table": [
    { id: "table_type", type: "choice", text: "Table type", choices: ["Executive", "Office", "Computer"], required: false },
    { id: "size", type: "choice", text: "Size (preset)", choices: ["3x1.5", "3x2", "4x2", "5x2.5", "5x3", "6x3", "Custom"], required: false },
    { id: "material", type: "choice", text: "Material", choices: ["MDF", "Particle board", "Plywood", "Steel"], required: false },
    { id: "storage", type: "choice", text: "Storage", choices: ["None", "Drawer", "Cupboard"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true
, placeholder: "e.g. Walnut finish" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false },
  ],
    "Cupboard": [
    { id: "type", type: "choice", text: "Type", choices: ["Wardrobe", "Filing cabinet", "Storage"], required: false },
    { id: "material", type: "choice", text: "Material", choices: ["Wood", "Metal", "Plastic"], required: false },
    { id: "doors", type: "choice", text: "No. of doors", choices: ["1", "2", "3", "4"], required: false },
    { id: "shelves", type: "choice", text: "No. of shelves", choices: ["1", "2", "3", "4", "5+"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. White" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false },
  ],
    "Bed": [
    { id: "size", type: "choice", text: "Size", choices: ["Single", "Double", "Queen", "King"], required: false },
    { id: "frame_material", type: "choice", text: "Frame material", choices: ["Wood", "Metal", "Upholstered"], required: false },
    { id: "headboard", type: "choice", text: "Headboard", choices: ["With headboard", "Without headboard"], required: false },
    { id: "storage", type: "choice", text: "Storage", choices: ["With storage", "Without storage"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. Oak finish" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false },
    ],
    "Mattress": [
    { id: "size", type: "choice", text: "Size", choices: ["Single", "Double", "Queen", "King"], required: false },
    { id: "type", type: "choice", text: "Type", choices: ["Foam", "Spring", "Memory Foam", "Latex"], required: false },
    { id: "firmness", type: "choice", text: "Firmness", choices: ["Soft", "Medium", "Firm"], required: false },
    { id: "thickness", type: "choice", text: "Thickness", choices: ["6 inch", "8 inch", "10 inch", "12 inch"], required: false },
    { id: "primary_color", type: "color", text: "Primary colour (required)", required: true, placeholder: "e.g. White" },
    { id: "secondary_color", type: "color", text: "Secondary colour (optional)", required: false, placeholder: "e.g. #rrggbb" },
    { id: "reference", type: "file", text: "Reference image / sample (optional)", required: false },
  ],
};
export default CATEGORY_FIELDS;