import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInventory } from "../../data/mockData";
import Header from "../../components/Header";
//import { Inventory } from "@mui/icons-material";

const Inventory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "ItemName",
      headerName: "Item Namee",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "amountKg",
      headerName: "Amount Kg",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.price}
        </Typography>
      ),
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            alignContent: 'center',
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
           color: `${colors?.grey?.[100] || "#E0E0E0"} !important`,
          },
          "& .MuiCheckbox-root": {
           color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
         checkboxSelection
         rows={mockDataInventory} 
         columns={columns} 
         slots={{ toolbar: GridToolbar }} 
        />
      </Box>
    </Box>
  );
};

export default Inventory;