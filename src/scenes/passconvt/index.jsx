import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";


const convertText = (text) => {

  const translationMap = {
    a: "g", e: "d", i: "r", o: "p", u: "l", y: "t",
    g: "a", d: "e", r: "i", p: "o", l: "u", t: "y"
  };

  let convertedText = "";
  let i = 0;

  while (i < text.length) {
    let ch = text[i];
    let translatedChar = translationMap[ch.toLowerCase()] || ch;

    if (ch === ch.toUpperCase()) {
      translatedChar = translatedChar.toUpperCase();
    }

    // Special case for "**" ↔ "20"
    if (text.substring(i, i + 2) === "**") {
      convertedText += "20";
      i += 1;
    } else if (text.substring(i, i + 2) === "20") {
      convertedText += "**";
      i += 1;
    } else {
      convertedText += translatedChar;
    }
    i++;
  }

  return convertedText;
};

const Pass = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px 50px 20px 50px">
      <Header title="TEXT CONVERTER" subtitle="Convert encrypted text" />

      <Formik
        initialValues={{ encryptedText: "", convertedPass: "" }}
        validationSchema={yup.object().shape({
          encryptedText: yup.string().required("Required"),
          convertedPass: yup.string()
        })}
        onSubmit={(values, { setFieldValue }) => {
          const result = convertText(values.encryptedText);
          setFieldValue("convertedPass", result);
        }}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="15px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
            >
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Insert Encrypted Text"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e); // Update Formik state
                }}
                value={values.encryptedText}
                name="encryptedText"
                error={!!touched.encryptedText && !!errors.encryptedText}
                helperText={touched.encryptedText && errors.encryptedText}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label=""
                value={values.convertedPass}
                name="convertedPass"
                InputProps={{ readOnly: true }}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box
             sx={{ flexGrow: 1 }}
             display="grid"
             gap="15px"
             gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            >
              <Box 
                display="flex" 
                justifyContent="center" 
                mt="20px"
              >
                <Button 
                  type="submit" 
                  color="secondary" 
                  variant="contained"
                  sx={{ flexGrow: 1 }}
                >
                  Convert
                </Button>
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button 
                  type="submit" 
                  color="secondary" 
                  variant="contained"
                  sx={{ flexGrow: 1 }}          
                  onClick={() => {
                    const resultText = values.convertedPass; // Get the value from Formik state   
                    console.log('Copying to clipboard:', resultText); // Debugging log to check the value     
                    navigator.clipboard.writeText(resultText)
                      .then(() => {
                        console.display("Text copied"); // This log should appear if it works
                      })
                      .catch((err) => {
                        console.error('Failed to copy text: ', err); // This logs any error if copying fails
                      });
                  }}
                 >
                  Copy   
                </Button>
              </Box>
            </Box>        
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Pass;

// import { Box, Button, TextField } from "@mui/material";
// import { Formik } from "formik";
// import * as yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../components/Header";

// const Pass = () => {
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const handleFormSubmit = (values) => {
//     console.log(values);
//   };
//   return (
//     <Box m="20px 50px 20px 50px">
//       <Header title="TEXT CONVERTER" subtitle="Convert encrypted text" />

//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={initialValues}
//         validationSchema={checkoutSchema}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <Box
//               display="grid"
//               gap="15px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//               }}
//             >
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="password"
//                 label="Inser Encrypted Text"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.firstName}
//                 name="encryptedText"
//                 error={!!touched.firstName && !!errors.firstName}
//                 helperText={touched.firstName && errors.firstName}
//                 sx={{ 
//                   gridColumn: "span 2",
//                   "& .MuiInputBase-input": { fontSize: "16px" },  // Font size for input text
//                   "& .MuiInputLabel-root": { fontSize: "14px" },  // Font size for label
//                   "& .MuiFormHelperText-root": { fontSize: "14px" },  // Font size for label
//                 }}
                
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="result"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.lastName}
//                 name="convertedPass"
//                 error={!!touched.lastName && !!errors.lastName}
//                 helperText={touched.lastName && errors.lastName}
//                 sx={{ 
//                   gridColumn: "span 2",
//                   "& .MuiInputBase-input": { fontSize: "16px" },  // Font size for input text
//                   "& .MuiInputLabel-root": { fontSize: "14px" },  // Font size for label
//                   "& .MuiFormHelperText-root": { fontSize: "14px" },  // Font size for label
//                 }}
//               />
//             </Box>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Convert
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// const checkoutSchema = yup.object().shape({
//   encryptedText: yup.string().required("required"),
//   convertedPass: yup.string().required("required"),
// });
// const initialValues = {
//   encryptedText: "",
//   convertedPass: "",
// };

// export default Pass;