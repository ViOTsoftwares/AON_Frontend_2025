import TreeSelect from "./TreeSelect";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { FetchAllProductsApi } from "../Api_Action";
function Filter({
  handleClose,
  brands,
  categories,
  FabricType,
  FinishType,
  FrameMaterial,
  priceRangeValue,
  setPriceRangeValue,
  setProducts,
  filter,
  setFilter,
  chips,
  setChip,
}) {
  const PRICE_MIN = 0;
  const PRICE_MAX = 50000;

  // useEffect(() => {
  //   const fetchFilteredData = async () => {
  //     const data = await FetchAllProductsApi("", filter, "page", "limit");
  //     setProducts(data?.product || []);
  //   };

  //   fetchFilteredData();
  // }, [filter]);
  const handleDelete = (br) => {
    setChip((chips) => chips.filter((chip) => chip !== br));
  };

  // const handlePriceRangeChange = (event, newValue) => {
  //   setPriceRangeValue(newValue);
  // };
  // helper to clamp values inside slider range
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
  // Slider handler
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeValue(newValue);
    setFilter((prev) => ({
      ...prev,
      Price: { min: newValue[0], max: newValue[1] },
    }));
  };
  const handleClearAll = () => {
    setChip([]);
    setPriceRangeValue([PRICE_MIN, PRICE_MAX]);
    setFilter({
      Brand: [],
      Category: [],
      FabricType: [],
      FinishType: [],
      FrameMaterial: [],
      Price: { min: PRICE_MIN, max: PRICE_MAX },
    });
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="h6"
            color="info"
            sx={{ display: { sm: "none" } }}
          >
            Arun Office Needs
          </Typography>
          <IconButton sx={{ display: { sm: "none" } }} onClick={handleClose}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            disableRipple
            disableFocusRipple
            sx={{ fontSize: "1.01rem", color: "rgb(66, 64, 64)" }}
            startIcon={<TuneIcon fontSize="inherit" />}
          >
            Filters
          </Button>
          <Button
            color="info"
            variant="text"
            onClick={handleClearAll}
            sx={{
              borderRadius: 25,
              "&:hover": {
                backgroundColor: "#1972D&",
              },
            }}
          >
            Clear all
          </Button>
        </Stack>
      </Grid>
      <Grid>
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          rowGap={0.78}
          columnGap={0.78}
        >
          {chips?.length > 0 &&
            chips?.map((chip) => (
              <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                <Chip
                  label={chip}
                  // onDelete={() => {
                  //   // handleDelete(chip);
                  // }}
                  color="info"
                  variant="outlined"
                />
              </Grow>
            ))}
        </Stack>
      </Grid>
      <Grid>
        <TreeSelect
          title="Brand"
          select={brands}
          chips={chips}
          setChip={setChip}
          filterKey="Brand"
          filter={filter}
          setFilter={setFilter}
        />
        <TreeSelect
          title="Category"
          select={categories}
          chips={chips}
          setChip={setChip}
          filterKey="Category"
          filter={filter}
          setFilter={setFilter}
        />
        <TreeSelect
          title="Fabric Type"
          showCheckBoxs={true}
          select={FabricType}
          chips={chips}
          setChip={setChip}
          filterKey="FabricType"
          filter={filter}
          setFilter={setFilter}
        />
        <TreeSelect
          title="Finish Type"
          showCheckBoxs={true}
          select={FinishType}
          chips={chips}
          setChip={setChip}
          filterKey="FinishType"
          filter={filter}
          setFilter={setFilter}
        />
        <TreeSelect
          title="Frame Material"
          showCheckBoxs={true}
          select={FrameMaterial}
          chips={chips}
          setChip={setChip}
          filterKey="FrameMaterial"
          filter={filter}
          setFilter={setFilter}
        />
        <Typography
          fontWeight={680}
          fontSize="1.1rem"
          variant="body2"
          color="textPrimary"
          lineHeight="2.6rem"
          pl={1}
        >
          Price
        </Typography>
        <Slider
          getAriaLabel={() => "Price range"}
          value={priceRangeValue}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={PRICE_MIN}
          max={PRICE_MAX}
          sx={{
            color: "#007bff",
            height: 5,
            padding: "15px 0",
            "& .MuiSlider-thumb": {
              height: 25,
              width: 24,
              backgroundColor: " rgb(255, 255, 255)",
              border: "solid 0.23px gray",
              boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
              "&:focus, &:hover, &.Mui-active": {
                boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
              },
              "&:before": {
                boxShadow:
                  "0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)",
              },
            },
            "& .MuiSlider-valueLabel": {
              fontSize: 14,

              top: -0,
              backgroundColor: "unset",
              color: "rgb(27, 27, 27)",
              fontWeight: 500,
              "&::before": {
                display: "none",
              },
            },
            "& .MuiSlider-track": {
              border: "none",
              height: 5.5,
            },
            "& .MuiSlider-rail": {
              opacity: 0.5,
              boxShadow: "inset 0px 0px 4px -2px #000",
              backgroundColor: "#d0d0d0",
            },
          }}
        />

        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {/* // Min input */}
          <TextField
            helperText="min"
            variant="outlined"
            value={priceRangeValue?.[0]}
            onChange={(e) => {
              const newMin = clamp(
                Number(e.target.value),
                PRICE_MIN,
                priceRangeValue[1]
              );
              setPriceRangeValue([newMin, priceRangeValue[1]]);
              setFilter((prev) => ({
                ...prev,
                Price: { min: newMin, max: priceRangeValue[1] },
              }));
            }}
            sx={{
              width: "90px",
              input: {
                textAlign: "center",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "1.6rem",
              },
              ".MuiFormHelperText-root": {
                textAlign: "center",
                fontSize: "0.90rem",
              },
            }}
          />
          {/* // Max input */}
          <Typography>-</Typography>
          <TextField
            helperText="max"
            variant="outlined"
            value={priceRangeValue?.[1]}
            onChange={(e) => {
              const newMax = clamp(
                Number(e.target.value),
                priceRangeValue[0],
                PRICE_MAX
              );
              setPriceRangeValue([priceRangeValue[0], newMax]);
              setFilter((prev) => ({
                ...prev,
                Price: { min: priceRangeValue[0], max: newMax },
              }));
            }}
            sx={{
              width: "90px",
              input: {
                textAlign: "center",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "1.6rem",
              },
              ".MuiFormHelperText-root": {
                textAlign: "center",
                fontSize: "0.90rem",
              },
            }}
          />
        </Stack>
      </Grid>
      <Button fullWidth variant="contained" onClick={handleClearAll}>
        {" "}
        Clear All{" "}
      </Button>
    </Grid>
  );
}

export default Filter;
