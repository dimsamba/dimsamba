import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Inventory from "./scenes/inventory";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Pass from "./scenes/passconvt";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import { useState } from "react";
import { supabase } from "./supabaseClient"; // Assuming supabaseClient is set up properly

function App() {
  const [theme, colorMode] = useMode();
  const [invoices, setInvoices] = useState([]);

  const login = async () => {
    console.log("Login function started");
    console.log("User session:", supabase.auth.getSession());


    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.error("Login failed:", error.message);
      return; // Stop execution if login fails
    }

    console.log("Login success:", data);

    // Insert a test row into the invoices table
    console.log("Attempting to insert data into invoices table...");
    const { data: insertData, error: insertError } = await supabase
      .from("invoices")
      .insert([
        {
          invoiceNumber: "111222",
          invoiceDate: "1973-09-12",
          supplier: "Misa",
          supplierContact: "misa123@supplxcvier.com",
          amountHT: "125.55",
          amountTTC: "138.55",
          tva: "12%",
          note: "Test 122",
        },
      ]);

    if (insertError) {
      console.error("Error inserting row:", insertError.message);
    } else {
      console.log("Inserted row:", insertData);
    }

    // Fetch invoices to verify the insertion
    console.log("Fetching invoices...");
    const { data: invoicesData, error: fetchError } = await supabase
      .from("invoices")
      .select("*");

    if (fetchError) {
      console.error("Error fetching invoices:", fetchError.message);
    } else {
      console.log("Invoices data:", invoicesData);
      setInvoices(invoicesData);
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Box m="25px 0px 25px 25px">
              <button
                style={{ width: "200px" }}
                onClick={() => {
                  console.log("Login button clicked!");
                  login();
                }}
              >
                Log In
              </button>

              {/* Display the invoices data */}
              <table>
                <thead>
                  <tr>
                    <th>Invoice Number</th>
                    <th>Invoice Date</th>
                    <th>Supplier</th>
                    <th>Amount (HT)</th>
                    <th>Amount (TTC)</th>
                    <th>TVA</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr key={index}>
                      <td>{invoice.invoiceNumber}</td>
                      <td>{invoice.invoiceDate}</td>
                      <td>{invoice.supplier}</td>
                      <td>{invoice.amountHT}</td>
                      <td>{invoice.amountTTC}</td>
                      <td>{invoice.tva}</td>
                      <td>{invoice.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            <Topbar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/passconvt" element={<Pass />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;






// import { ColorModeContext, useMode } from "./theme";
// import { Box, CssBaseline, ThemeProvider } from "@mui/material";
// import { Routes, Route } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Inventory from "./scenes/inventory";
// import Team from "./scenes/team";
// import Contacts from "./scenes/contacts";
// import Invoices from "./scenes/invoices";
// import Form from "./scenes/form";
// import Calendar from "./scenes/calendar";
// import FAQ from "./scenes/faq";
// import Pass from "./scenes/passconvt";
// import Bar from "./scenes/bar";
// import Pie from "./scenes/pie";
// import Line from "./scenes/line";
// import { useState } from "react";
// import { supabase } from "./supabaseClient"; // Assuming supabaseClient is set up properly
// // import Geography from "./scenes/geography";

// function App() {
//   const [theme, colorMode] = useMode();

//    // Define the 'invoices' state
//    const [invoices, setInvoices] = useState([]);

//    const login = async () => {
//      console.log('Button clicked!'); // Check if the button click triggers the function
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: "github",
//     }); 
//     if (error) {
//       console.error("Login failed:", error.message);
//     } else {
//       console.log("Login success:", data);

//        // Insert a test row into the invoices table
//     const { data: insertData, error: insertError } = await supabase
//     .from('invoices')
//     .insert([
//       {
//         invoiceNumber: 'INV123456',
//         invoiceDate: '2025-03-19',
//         supplier: 'Supplier Name',
//         supplierContact: 'contact@supplier.com',
//         amountHT: '1000',
//         amountTTC: '1200',
//         tva: '200',
//         note: 'Test Invoice',
//       },
//     ]);

//     if (insertError) {
//       console.error('Error inserting row:', insertError.message);
//     } else {
//       console.log('Inserted row:', insertData);
//     }

//     // Fetch invoices to verify the insertion
//     const { data: invoicesData, error: fetchError } = await supabase
//       .from('invoices')
//       .select('*');

//     if (fetchError) {
//       console.error('Error fetching invoices:', fetchError.message);
//     } else {
//       console.log('Invoices data:', invoicesData);
//       setInvoices(invoicesData);  // Set the fetched invoices data in the state
//     }
//   }
//   };

//   return ( 
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="app">
//           <Sidebar />
//           <main className="content">
//           <Box m="25px 0px 25px 25px">
  
//           <button
//             style={{ width: "200px" }}
//             onClick={(event) => login(event)}
//           >
//             Log In
//           </button>

//         {/* Display the invoices data */}
//     <table>
//       <thead>
//         <tr>
//           <th>Invoice Number</th>
//           <th>Invoice Date</th>
//           <th>Supplier</th>
//           <th>Amount (HT)</th>
//           <th>Amount (TTC)</th>
//           <th>TVA</th>
//           <th>Note</th>
//         </tr>
//       </thead>
//       <tbody>
//         {invoices.map((invoice, index) => (
//           <tr key={index}>
//             <td>{invoice.invoiceNumber}</td>
//             <td>{invoice.invoiceDate}</td>
//             <td>{invoice.supplier}</td>
//             <td>{invoice.amountHT}</td>
//             <td>{invoice.amountTTC}</td>
//             <td>{invoice.tva}</td>
//             <td>{invoice.note}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     </Box>

//             <Topbar />
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/inventory" element={<Inventory />} />  
//               <Route path="/team" element={<Team />} /> 
//               <Route path="/contacts" element={<Contacts />} /> 
//               <Route path="/invoices" element={<Invoices />} /> 
//               <Route path="/form" element={<Form />} /> 
//               <Route path="/calendar" element={<Calendar />} /> 
//               <Route path="/faq" element={<FAQ />} /> 
//               <Route path="/passconvt" element={<Pass />} /> 
//               <Route path="/bar" element={<Bar />} /> 
//               <Route path="/pie" element={<Pie />} /> 
//               <Route path="/line" element={<Line />} /> 
//               {/* <Route path="/geography" element={<Geography />} />               */}
//             </Routes> 
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };

// export default App;


// import { ColorModeContext, useMode } from "./theme";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { Routes, Route } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Inventory from "./scenes/inventory";
// import Team from "./scenes/team";
// import Contacts from "./scenes/contacts";
// import Invoices from "./scenes/invoices";
// import Form from "./scenes/form";
// import Calendar from "./scenes/calendar";
// import FAQ from "./scenes/faq";
// import Pass from "./scenes/passconvt";
// import Bar from "./scenes/bar";
// import Pie from "./scenes/pie";
// import Line from "./scenes/line";
// // import Geography from "./scenes/geography";

// function App() {
//   const [theme, colorMode] = useMode();

//   return ( 
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="app">
//           <Sidebar />
//           <main className="content">
//             <Topbar />
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/inventory" element={<Inventory />} />  
//               <Route path="/team" element={<Team />} /> 
//               <Route path="/contacts" element={<Contacts />} /> 
//               <Route path="/invoices" element={<Invoices />} /> 
//               <Route path="/form" element={<Form />} /> 
//               <Route path="/calendar" element={<Calendar />} /> 
//               <Route path="/faq" element={<FAQ />} /> 
//               <Route path="/passconvt" element={<Pass />} /> 
//               <Route path="/bar" element={<Bar />} /> 
//               <Route path="/pie" element={<Pie />} /> 
//               <Route path="/line" element={<Line />} /> 
//               {/* <Route path="/geography" element={<Geography />} />               */}
//             </Routes> 
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };

// export default App;
