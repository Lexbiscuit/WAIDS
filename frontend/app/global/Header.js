import { Typography, Box } from "@mui/material";
import { useTheme } from 'next-themes';

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color="inherit"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color="inherit">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
