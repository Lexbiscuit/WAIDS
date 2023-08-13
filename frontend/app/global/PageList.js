import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import ImportContactsOutlined from "@mui/icons-material/ImportContactsOutlined";

const PageList = [
  {
    name: "About Us",
    href: "about",
    icon: <LightbulbOutlinedIcon />,
  },
  {
    name: "Contact Us",
    href: "contact",
    icon: <ContactPageOutlinedIcon />,
  },
  {
    name: "Third Option",
    href: "another",
    icon: <ImportContactsOutlined />,
  },
];

export default PageList;
