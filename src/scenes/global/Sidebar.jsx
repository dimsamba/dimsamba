import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, Button, Drawer, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (

    <MenuItem
  active={selected === title}
  style={{ color: colors.grey[100] }}
  onClick={() => setSelected(title)}
  icon={icon}
>
  <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
    <Typography>{title}</Typography>
  </Link>
</MenuItem>

  );
};

  const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false); // State to control PIN modal
  const [pinInput, setPinInput] = useState(""); // Store entered PIN
  const [pinError, setPinError] = useState(false); // Handle incorrect PIN
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Detect screen width changes
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
    // Define the correct PIN
    const correctPIN = "1213"; // Change this to your secure PIN

    // Function to handle PIN validation
  const handlePinSubmit = () => {
    if (pinInput === correctPIN) {
      setPinOpen(false);
      setPinInput("");
      setPinError(false);
      navigate("/passconvt"); // Navigate to Pass page
    } else {
      setPinError(true); // Show error message
    }
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
        //  background: `${colors.primary[400]} !important`,
          background: `${colors?.primary?.[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",      
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      {mobileView ? (
        // Show hamburger menu on mobile
        <IconButton onClick={() => setIsDrawerOpen(true)} sx={{ m: 2 }}>
          <MenuOutlinedIcon />
        </IconButton>
      ) : null}

      {/* Sidebar for larger screens */}
      {!mobileView && (

      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 10px 0",
              color: colors.grey="#1f6040",
            }}
          >
             {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
             <Box display="flex" justifyContent="center" alignItems="center">
             <img 
                alt="profile-user"
                width="80px"
                height="80px"
                src="/assets/LOGO-circle.png"  // Use a relative path from the public folder
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
              </Box>
              <Box textAlign="center">
                <Typography
                 variant="h3"
                 color={colors.grey[100]}
                 fontWeight="bold"
                 sx={{ m: "10px 0 0 0" }}
                >
                  Dim Samba
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Isy & Tammy
                </Typography>
              </Box>
            </Box>
          )}
          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
             // title="Dashboard"
              title={isCollapsed ? "" : "Dashboard"}  // Hide text when collapsed
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}              
            />
            <Typography
              variant="h5"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Inventory"
              to="/inventory"
              icon={<Inventory2OutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              sx={{ fontSize: "30px" }}
            />
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              sx={{ fontSize: "30px" }}
            />
            <Item
              title="Contacts Information" 
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           {/* PIN-Protected "Pass" Page */}
            <MenuItem
             title="Pass"
             icon={<LockOpenOutlinedIcon />}
             active={selected === "Pass"}
             onClick={() => {
              setPinOpen(true);  // Close the dialog
              setPinInput("");    // Reset the PIN input
              setPinError(false); // Reset the error state
            }} 
            >
             <Typography>Pass</Typography>
          </MenuItem>
          {/* PIN Modal */}
          <Dialog 
            open={pinOpen} 
            onClose={() => setPinOpen(false)}
            sx={{
              "& .MuiDialog-paper": {
                backgroundColor: "#141b2d", // Change the whole popup background
                color: colors.greenAccent[400], // Change text color
                borderRadius: "10px", // Optional: Add rounded corners
                padding: "20px", // Optional: Add padding for better spacing
              },
            }}
            >
            <DialogTitle 
            fontSize={"16px"} 
            align="center"
           // sx={{ backgroundColor:"#34495e", color: "white" }}
            >
              Enter PIN
            </DialogTitle>
            <DialogContent>
              <TextField
                type="password"
               // label="4-digit PIN"
                variant="outlined"
                fullWidth
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                error={pinError}
                helperText={pinError ? "Incorrect PIN. Try again." : ""}
                inputProps={{ maxLength: 4 }}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Adjust the size as needed
                  visibility: pinError ? "visible" : "hidden" 
                }}
                sx={{
                  backgroundColor: theme.palette.mode === "dark" ? "#141b2d" : "#ffffff", // Dark mode background
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: "red !important",
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: theme.palette.mode === "dark" ? "#141b2d" : "#727681", // Adapt to theme
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", // Adjust text color
                    borderRadius: "5px",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: pinError ? "red" : theme.palette.text.primary,
                    transition: "all 0.3s ease",
                    transform: "translateY(-40px)", // Move the label further up
                    fontSize: "0px", // Hide the text completely
                  }
                }}
              
              />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button 
              onClick={() => {
                setPinOpen(false);  // Close the dialog
                setPinInput("");    // Reset the PIN input
                setPinError(false); // Reset the error state
              }}
                sx={{
                  color: colors.greenAccent[400],
                }}          
              >
                Cancel
              </Button>
              <Button 
              onClick={handlePinSubmit} 
              variant="contained"            
              sx={{
                color: colors.greenAccent[400],              
              }}
              >
                Enter
              </Button>
            </DialogActions>
          </Dialog>
            <Typography
              variant="h5"
              color={colors.grey[400]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
      )}

      {/* Drawer Sidebar for Mobile */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box sx={{ width: 250 }}>
          <ProSidebar collapsed={false}>
            <Menu iconShape="square">
              <MenuItem onClick={() => setIsDrawerOpen(false)}>
                <Typography variant="h5">Close</Typography>
              </MenuItem>
              <Item title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Inventory" to="/inventory" icon={<Inventory2OutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Manage Team" to="/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            </Menu>
          </ProSidebar>
        </Box>
      </Drawer>

    </Box>
  );
};

export default Sidebar;  // This exports Sidebar as the default export



// import { useState } from "react";
// import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Box, IconButton, Typography, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
// import "react-pro-sidebar/dist/css/styles.css";
// import { tokens } from "../../theme";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
// // import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

// const Item = ({ title, to, icon, selected, setSelected }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (

//     <MenuItem
//   active={selected === title}
//   style={{ color: colors.grey[100] }}
//   onClick={() => setSelected(title)}
//   icon={icon}
// >
//   <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
//     <Typography>{title}</Typography>
//   </Link>
// </MenuItem>

//   );
// };

//   const Sidebar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [selected, setSelected] = useState("Dashboard");
//   const [pinOpen, setPinOpen] = useState(false); // State to control PIN modal
//   const [pinInput, setPinInput] = useState(""); // Store entered PIN
//   const [pinError, setPinError] = useState(false); // Handle incorrect PIN
//   const navigate = useNavigate(); // Hook to navigate programmatically
  
//     // Define the correct PIN
//     const correctPIN = "1213"; // Change this to your secure PIN

//     // Function to handle PIN validation
//   const handlePinSubmit = () => {
//     if (pinInput === correctPIN) {
//       setPinOpen(false);
//       setPinInput("");
//       setPinError(false);
//       navigate("/passconvt"); // Navigate to Pass page
//     } else {
//       setPinError(true); // Show error message
//     }
//   };

//   return (
//     <Box
//       sx={{
//         "& .pro-sidebar-inner": {
//         //  background: `${colors.primary[400]} !important`,
//           background: `${colors?.primary?.[400]} !important`,
//         },
//         "& .pro-icon-wrapper": {
//           backgroundColor: "transparent !important",
//         },
//         "& .pro-inner-item": {
//           padding: "5px 35px 5px 20px !important",      
//         },
//         "& .pro-inner-item:hover": {
//           color: "#868dfb !important",
//         },
//         "& .pro-menu-item.active": {
//           color: "#6870fa !important",
//         },
//       }}
//     >
//       <ProSidebar collapsed={isCollapsed}>
//         <Menu iconShape="square">
//           {/* LOGO AND MENU ICON */}
//           <MenuItem
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
//             style={{
//               margin: "10px 0 10px 0",
//               color: colors.grey="#1f6040",
//             }}
//           >
//              {!isCollapsed && (
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 ml="15px"
//               >
//                 <Typography variant="h3" color={colors.grey[100]}>
//                 </Typography>
//                 <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
//                   <MenuOutlinedIcon />
//                 </IconButton>
//               </Box>
//             )}
//           </MenuItem>
//           {/* USER */}
//           {!isCollapsed && (
//             <Box mb="25px">
//              <Box display="flex" justifyContent="center" alignItems="center">
//              <img 
//                 alt="profile-user"
//                 width="80px"
//                 height="80px"
//                 src="/assets/LOGO-circle.png"  // Use a relative path from the public folder
//                 style={{ cursor: "pointer", borderRadius: "50%" }}
//               />
//               </Box>
//               <Box textAlign="center">
//                 <Typography
//                  variant="h3"
//                  color={colors.grey[100]}
//                  fontWeight="bold"
//                  sx={{ m: "10px 0 0 0" }}
//                 >
//                   Dim Samba
//                 </Typography>
//                 <Typography variant="h5" color={colors.greenAccent[500]}>
//                   Isy & Tammy
//                 </Typography>
//               </Box>
//             </Box>
//           )}
//           {/* Menu Items */}
//           <Box paddingLeft={isCollapsed ? undefined : "10%"}>
//             <Item
//              // title="Dashboard"
//               title={isCollapsed ? "" : "Dashboard"}  // Hide text when collapsed
//               to="/dashboard"
//               icon={<HomeOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}              
//             />
//             <Typography
//               variant="h5"
//               color={colors.grey[300]}
//               sx={{ m: "15px 0 5px 20px" }}
//             >
//               Data
//             </Typography>
//             <Item
//               title="Inventory"
//               to="/inventory"
//               icon={<Inventory2OutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//               sx={{ fontSize: "30px" }}
//             />
//             <Item
//               title="Manage Team"
//               to="/team"
//               icon={<PeopleOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//               sx={{ fontSize: "30px" }}
//             />
//             <Item
//               title="Contacts Information" 
//               to="/contacts"
//               icon={<ContactsOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//              <Item
//               title="Invoices Balances"
//               to="/invoices"
//               icon={<ReceiptOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Typography
//               variant="h5"
//               color={colors.grey[300]}
//               sx={{ m: "15px 0 5px 20px" }}
//             >
//               Pages
//             </Typography>
//             <Item
//               title="Profile Form"
//               to="/form"
//               icon={<PersonOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Calendar"
//               to="/calendar"
//               icon={<CalendarTodayOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="FAQ Page"
//               to="/faq"
//               icon={<HelpOutlineOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//            {/* PIN-Protected "Pass" Page */}
//             <MenuItem
//              title="Pass"
//              icon={<LockOpenOutlinedIcon />}
//              active={selected === "Pass"}
//              onClick={() => {
//               setPinOpen(true);  // Close the dialog
//               setPinInput("");    // Reset the PIN input
//               setPinError(false); // Reset the error state
//             }} 
//             >
//              <Typography>Pass</Typography>
//           </MenuItem>
//           {/* PIN Modal */}
//           <Dialog 
//             open={pinOpen} 
//             onClose={() => setPinOpen(false)}
//             sx={{
//               "& .MuiDialog-paper": {
//                 backgroundColor: "#141b2d", // Change the whole popup background
//                 color: colors.greenAccent[400], // Change text color
//                 borderRadius: "10px", // Optional: Add rounded corners
//                 padding: "20px", // Optional: Add padding for better spacing
//               },
//             }}
//             >
//             <DialogTitle 
//             fontSize={"16px"} 
//             align="center"
//            // sx={{ backgroundColor:"#34495e", color: "white" }}
//             >
//               Enter PIN
//             </DialogTitle>
//             <DialogContent>
//               <TextField
//                 type="password"
//                // label="4-digit PIN"
//                 variant="outlined"
//                 fullWidth
//                 value={pinInput}
//                 onChange={(e) => setPinInput(e.target.value)}
//                 error={pinError}
//                 helperText={pinError ? "Incorrect PIN. Try again." : ""}
//                 inputProps={{ maxLength: 4 }}
//                 FormHelperTextProps={{
//                   sx: { fontSize: "1rem" }, // Adjust the size as needed
//                   visibility: pinError ? "visible" : "hidden" 
//                 }}
//                 sx={{
//                   backgroundColor: theme.palette.mode === "dark" ? "#141b2d" : "#ffffff", // Dark mode background
//                   borderRadius: "5px",
//                   "& .MuiOutlinedInput-root": {
//                     "&.Mui-error .MuiOutlinedInput-notchedOutline": {
//                       borderColor: "red !important",
//                     },
//                   },
//                 }}
//                 InputProps={{
//                   sx: {
//                     backgroundColor: theme.palette.mode === "dark" ? "#141b2d" : "#727681", // Adapt to theme
//                     color: theme.palette.mode === "dark" ? "#ffffff" : "#000000", // Adjust text color
//                     borderRadius: "5px",
//                   },
//                 }}
//                 InputLabelProps={{
//                   sx: {
//                     color: pinError ? "red" : theme.palette.text.primary,
//                     transition: "all 0.3s ease",
//                     transform: "translateY(-40px)", // Move the label further up
//                     fontSize: "0px", // Hide the text completely
//                   }
//                 }}
              
//               />
//             </DialogContent>
//             <DialogActions sx={{ justifyContent: "center" }}>
//               <Button 
//               onClick={() => {
//                 setPinOpen(false);  // Close the dialog
//                 setPinInput("");    // Reset the PIN input
//                 setPinError(false); // Reset the error state
//               }}
//                 sx={{
//                   color: colors.greenAccent[400],
//                 }}          
//               >
//                 Cancel
//               </Button>
//               <Button 
//               onClick={handlePinSubmit} 
//               variant="contained"            
//               sx={{
//                 color: colors.greenAccent[400],              
//               }}
//               >
//                 Enter
//               </Button>
//             </DialogActions>
//           </Dialog>
//             <Typography
//               variant="h5"
//               color={colors.grey[400]}
//               sx={{ m: "15px 0 5px 20px" }}
//             >
//               Charts
//             </Typography>
//             <Item
//               title="Bar Chart"
//               to="/bar"
//               icon={<BarChartOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Pie Chart"
//               to="/pie"
//               icon={<PieChartOutlineOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Line Chart"
//               to="/line"
//               icon={<TimelineOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             {/* <Item
//               title="Geography Chart"
//               to="/geography"
//               icon={<MapOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             /> */}
//           </Box>
//         </Menu>
//       </ProSidebar>
//     </Box>
//   );
// };

// export default Sidebar;  // This exports Sidebar as the default export



// Functioning Code

// import { useState } from "react";
// import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
// import { tokens } from "../../theme";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
// // import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

// const Item = ({ title, to, icon, selected, setSelected }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (

//     <MenuItem
//   active={selected === title}
//   style={{ color: colors.grey[100] }}
//   onClick={() => setSelected(title)}
//   icon={icon}
// >
//   <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
//     <Typography>{title}</Typography>
//   </Link>
// </MenuItem>

//   );
// };

//   const Sidebar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [selected, setSelected] = useState("Dashboard");

//   return (
//     <Box
//       sx={{
//         "& .pro-sidebar-inner": {
//         //  background: `${colors.primary[400]} !important`,
//           background: `${colors?.primary?.[400]} !important`,
//         },
//         "& .pro-icon-wrapper": {
//           backgroundColor: "transparent !important",
//         },
//         "& .pro-inner-item": {
//           padding: "5px 35px 5px 20px !important",      
//         },
//         "& .pro-inner-item:hover": {
//           color: "#868dfb !important",
//         },
//         "& .pro-menu-item.active": {
//           color: "#6870fa !important",
//         },
//       }}
//     >
//       <ProSidebar collapsed={isCollapsed}>
//         <Menu iconShape="square">
//           {/* LOGO AND MENU ICON */}
//           <MenuItem
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
//             style={{
//               margin: "10px 0 10px 0",
//               color: colors.grey="#1f6040",
//             }}
//           >
//              {!isCollapsed && (
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 ml="15px"
//               >
//                 <Typography variant="h3" color={colors.grey[100]}>
//                 </Typography>
//                 <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
//                   <MenuOutlinedIcon />
//                 </IconButton>
//               </Box>
//             )}
//           </MenuItem>
//           {/* USER */}
//           {!isCollapsed && (
//             <Box mb="25px">
//              <Box display="flex" justifyContent="center" alignItems="center">
//              <img 
//                 alt="profile-user"
//                 width="80px"
//                 height="80px"
//                 src="/assets/LOGO-circle.png"  // Use a relative path from the public folder
//                 style={{ cursor: "pointer", borderRadius: "50%" }}
//               />
//               </Box>
//               <Box textAlign="center">
//                 <Typography
//                  variant="h3"
//                  color={colors.grey[100]}
//                  fontWeight="bold"
//                  sx={{ m: "10px 0 0 0" }}
//                 >
//                   Dim Samba
//                 </Typography>
//                 <Typography variant="h5" color={colors.greenAccent[500]}>
//                   Isy & Tammy
//                 </Typography>
//               </Box>
//             </Box>
//           )}
//           {/* Menu Items */}
//           <Box paddingLeft={isCollapsed ? undefined : "10%"}>
//             <Item
//              // title="Dashboard"
//               title={isCollapsed ? "" : "Dashboard"}  // Hide text when collapsed
//               to="/dashboard"
//               icon={<HomeOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}              
//             />
//             <Typography
//               variant="h5"
//               color={colors.grey[300]}
//               sx={{ m: "15px 0 5px 20px" }}
//             >
//               Data
//             </Typography>
//             <Item
//               title="Inventory"
//               to="/inventory"
//               icon={<Inventory2OutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//               sx={{ fontSize: "30px" }}
//             />
//             <Item
//               title="Manage Team"
//               to="/team"
//               icon={<PeopleOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//               sx={{ fontSize: "30px" }}
//             />
//             <Item
//               title="Contacts Information" 
//               to="/contacts"
//               icon={<ContactsOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//              <Item
//               title="Invoices Balances"
//               to="/invoices"
//               icon={<ReceiptOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Typography
//               variant="h5"
//               color={colors.grey[300]}
//               sx={{ m: "15px 0 5px 20px" }}
//             >
//               Pages
//             </Typography>
//             <Item
//               title="Profile Form"
//               to="/form"
//               icon={<PersonOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Calendar"
//               to="/calendar"
//               icon={<CalendarTodayOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="FAQ Page"
//               to="/faq"
//               icon={<HelpOutlineOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//              <Item
//               title="Pass"
//               to="/passconvt"
//               icon={<LockOpenOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Typography
//               variant="h5"
//               color={colors.grey[300]}
//               sx={{ m: "15px 0 5px 20px" }}
//             >
//               Charts
//             </Typography>
//             <Item
//               title="Bar Chart"
//               to="/bar"
//               icon={<BarChartOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Pie Chart"
//               to="/pie"
//               icon={<PieChartOutlineOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Line Chart"
//               to="/line"
//               icon={<TimelineOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             {/* <Item
//               title="Geography Chart"
//               to="/geography"
//               icon={<MapOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             /> */}
//           </Box>
//         </Menu>
//       </ProSidebar>
//     </Box>
//   );
// };

// export default Sidebar;  // This exports Sidebar as the default export


