import { useState } from "react";
import {
  Button,
  Stack,
  Collapse,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function TreeSelect({
  title,
  select,
  chips,
  setChip,
  filter,
  setFilter,
  filterKey,
}) {
  const [open, setOpen] = useState(false);

  const handleClick = (option) => {
    // Update chips for UI
    setChip((prevChips) =>
      prevChips.includes(option)
        ? prevChips.filter((chip) => chip !== option)
        : [...prevChips, option]
    );

    // Update filter object for API
    setFilter((prev) => {
      const values = prev[filterKey] || [];
      return {
        ...prev,
        [filterKey]: values.includes(option)
          ? values.filter((v) => v !== option)
          : [...values, option],
      };
    });
  };
  console.log("filter-------", filter);

  return (
    <Stack spacing={1}>
      <Button
        fullWidth
        disableRipple
        variant="filter"
        sx={{
          fontSize: "1.2rem",
          display: "flex",
          py: 1,
          justifyContent: "space-between",
          "&:hover": {
            backgroundColor: "var(--color-surface-subtle)",
          },
        }}
        onClick={() => setOpen(!open)}
      >
        <Typography
          fontWeight={600}
          fontSize="1.1rem"
          variant="body2"
          color="textPrimary"
        >
          {title}
        </Typography>
        {!open ? (
          <KeyboardArrowDownIcon fontSize="medium" />
        ) : (
          <KeyboardArrowUpIcon fontSize="medium" />
        )}
      </Button>

      <Collapse in={open}>
        <Stack spacing={0.5} px={1} py={1}>
          {select?.map((option) => (
            <FormControl key={option} component="fieldset" variant="standard">
              <FormControlLabel
                control={
                  <Checkbox
                    name={option}
                    size="small"
                    checked={chips?.includes(option)}
                    onChange={() => handleClick(option)}
                  />
                }
                slotProps={{
                  typography: {
                    variant: "body1",
                    color: "textSecondary",
                  },
                }}
                label={<Typography variant="body2">{option}</Typography>}
              />
            </FormControl>
          ))}
        </Stack>
      </Collapse>
      <Divider />
    </Stack>
  );
}

export default TreeSelect;
// import Divider from "@mui/material/Divider";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import Typography from "@mui/material/Typography";
// import Collapse from "@mui/material/Collapse";
// import { useState } from "react";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";

// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// function TreeSelect({
//   title,
//   showCheckBoxs = false,
//   select,
//   chips = false,
//   setChip,
// }) {
//   const [open, setOpen] = useState(showCheckBoxs);

//   const handleClick = (brand) => {
//     setChip((chips) => {
//       if (chips.includes(brand)) {
//         return (chips = chips.filter((chip) => chip !== brand));
//       }
//       return [...chips, brand];
//     });
//   };
//   return (
//     <>
//       <Button
//         fullWidth
//         disableRipple
//         sx={{
//           fontSize: "1.2rem",
//           display: "flex",
//           py: 1,
//           justifyContent: "space-between",
//           "&:hover": {
//             backgroundColor: "rgb(245, 245, 245)",
//           },
//         }}
//         onClick={() => setOpen(!open)}
//       >
//         <Typography
//           fontWeight={680}
//           fontSize="1.1rem"
//           variant="body2"
//           color="textPrimary"
//         >
//           {title}
//         </Typography>
//         {!open ? (
//           <KeyboardArrowDownIcon fontSize="medium" />
//         ) : (
//           <KeyboardArrowUpIcon fontSize="medium" />
//         )}
//       </Button>
//       <Divider />
//       <Collapse in={open}>
//         <Stack px={2}>
//           {select.map((brand, index) => (
//             <FormControl>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     disableRipple
//                     size="small"
//                     label={brand}
//                     checked={chips.includes(brand)}
//                     onClick={() => handleClick(brand)}
//                   />
//                 }
//                 label={brand}
//                 slotProps={{
//                   typography: {
//                     variant: "body1",
//                     color: "textSecondary",
//                   },
//                 }}
//               />
//             </FormControl>
//           ))}
//         </Stack>
//       </Collapse>
//     </>
//   );
// }

// export default TreeSelect;
