import officeChairs from "../assets/categories/Office_Chairs.png";
import officeTables from "../assets/categories/Office_Tables.png";
import workstations from "../assets/categories/Workstations.png";
import storageCabinets from "../assets/categories/Storage_Cabinets.png";
import officeSeating from "../assets/categories/Office_Seating.png";
import partitions from "../assets/categories/Partitions.png";
import sofas from "../assets/categories/Sofas.png";
import recliners from "../assets/categories/Recliners.png";
import dining from "../assets/categories/Dining.png";
import beds from "../assets/categories/Beds.png";
import homeStorage from "../assets/categories/Home_Storage.png";
import customization from "../assets/categories/Customization.png";

export const MAIN_CATEGORY_GROUPS = [
  {
    title: "Office",
    categories: [
      { name: "Office Chairs", image: officeChairs },
      { name: "Office Tables", image: officeTables },
      { name: "Workstations", image: workstations },
      { name: "Storage & Cabinets", image: storageCabinets },
      { name: "Office Seating", image: officeSeating },
      { name: "Partitions", image: partitions },
    ],
  },
  {
    title: "Home",
    categories: [
      { name: "Sofas", image: sofas },
      { name: "Recliners", image: recliners },
      { name: "Dining", image: dining },
      { name: "Beds", image: beds },
      { name: "Home Storage", image: homeStorage },
      { name: "Customization", image: customization, path: "/customization" },
    ],
  },
];
