import React, { useEffect, useState, } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import FreeTuitionImage from "./assets/FREETUITION.png";
import EaristLogo from "./assets/EaristLogo.png";

const CertificateOfRegistration = () => {
  const getEmployeeNumFromToken = () => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded Token: ", decoded);
      return decoded.employeeNumbER; // Get the employeeNumber
    }
    return null;
  };

  const [data, setData] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedSignature, setUploadedSignature] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
   // Now filter after initializing the states
   const employeeNum = getEmployeeNumFromToken();

   const filteredData = data.filter((item) => String(item.employeeNumber) === String(employeeNum));
 
 
  // Fetch all registrations
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/registrations");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchItems();
  }, []);

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("uploadedSignature", reader.result);
        setUploadedSignature(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("uploadedImage", reader.result);
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    const savedSignature = localStorage.getItem("uploadedSignature");

    if (savedSignature) setUploadedSignature(savedSignature);
    if (savedImage) setUploadedImage(savedImage);
    

    const updateDate = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours() % 12 || 12).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";

      const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
      setCurrentDate(formattedDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    backgroundColor: "#f8f9fa",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
    marginTop: "50px",
    color: "Black",
    overflowY: "scroll",
  };

  const contentStyle = {
    color: "black",
    width: "100%",
    maxWidth: "800px",
    paddingBottom: "90px",
  };


  return (

    <div style={containerStyle}>
      <div style={contentStyle}>
        <form
          style={{
            border: "1px solid black",
            padding: "0.25in",
            width: "8in",
            marginBottom: "7%",
            height: "fit-content",
            position: "relative",
          }}
        >
          <table
            style={{
              border: "1px solid black",
              borderCollapse: "collapse",
              fontFamily: "Arial, Helvetica, sans-serif",
              width: "8in",
              position: "relative",
              tableLayout: "fixed",
            }}
          >
            <tbody>
              <tr>
                <td colSpan={2} style={{ height: "0.1in", fontSize: "72.5%" }}>
                  <b>

                  </b>
                </td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
                <td colSpan={1} style={{ height: "0.1in", fontSize: "72.5%" }}></td>
              </tr>
              <tr>
                <td colSpan={2} style={{ height: "0.1in", fontSize: "62.5%" }}>
                  <b>

                  </b>
                </td>
              </tr>
              <tr>

                <td colSpan={40} style={{ height: "0.5in", textAlign: "center" }}>
                  <table width="100%" style={{ borderCollapse: "collapse" }}>
                    <tbody>
                      <tr>
                       

                        <td style={{ width: "20%", textAlign: "center" }}>
                          <img src={EaristLogo} alt="Earist Logo" style={{marginLeft: "25px", width: "150px", height: "110px" }} />
                        </td>

                        {/* Center Column - School Information */}
                        <td style={{ width: "60%", textAlign: "center", lineHeight: "1" }}>
                          <div>Republic of the Philippines</div>
                          <b>Eulogio "Amang" Rodriguez</b><br />
                          <b>Institute of Science and Technology</b><br />
                          Nagtahan St. Sampaloc, Manila<br />
                          <br />
                          <br />
                          <b style={{ fontSize: "16px", }}>CERTIFICATE OF REGISTRATION</b>
                        </td>

                        {/* Right Column - 2x2 Picture */}
                        <td
                          colSpan={4}
                          rowSpan={6}
                          style={{
                            textAlign: "center",
                            position: "relative",
                            width: "3.5cm",
                            height: "4.5cm", // Ensuring 2x2 size
                          }}
                        >
                          <div
                            style={{
                              width: "3.8cm",
                              height: "3.8cm",
                              marginRight: "30px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            {uploadedImage ? (
                              <img
                                src={uploadedImage}
                                alt="Uploaded"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  fontSize: "10px",
                                  lineHeight: "1.2",
                                  cursor: "pointer",
                                  textAlign: "center",
                                }}
                              >
                                Click to Upload Image
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                opacity: 0,
                                cursor: "pointer",
                              }}
                              title="Upload ID Picture"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>

              </tr>
              <tr>
                <td colSpan={15} style={{ height: "0.3in", fontSize: "62.5%" }}>


                </td>
              </tr>
              <tr>
                <td colSpan={10} style={{ height: "0.1in", fontSize: "55%" }}>
                  <i>
                    <b style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: "black" }}>
                      Registration No:&nbsp;
                      <span style={{ color: "red" }}>
                      2147483647
                      </span>
                    </b>
                  </i>
                </td>


                <td
                  colSpan={29}
                  style={{
                    height: "0.1in",
                    fontSize: "50%",
                    textAlign: "right",

                  }}
                >
                  <b style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: "black" }}>
                    Academic Year/Term : <span style={{ color: "red" }}>Second Semester AY 2024-2025</span>
                  </b>

                </td>
              </tr>
              <tr>
                <td
                  colSpan={42}
                  style={{
                    height: "0.2in",
                    fontSize: "72.5%",
                    backgroundColor: "gray",
                    color: "white",
                  }}
                >
                  <b>
                    <i style={{
                      color: "black", fontFamily: 'Arial, sans-serif',
                      fontSize: '12px', textAlign: "center", display: "block"
                    }}>
                      STUDENT GENERAL INFORMATION
                    </i>
                  </b>
                </td>
              </tr>
              <tr>

              </tr>

              <tr>
                <td
                  colSpan={4}
                  style={{
                    fontSize: "62.5%",
                  }}
                >
                  <input
                    type="text"
                    value={"Student No"}
                    readOnly
                    style={{
                      fontWeight: "bold",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              
              
              
              <td
                colSpan={13}
                style={{

                  fontSize: "62.5%",

                }}
              >
                <input
                type="text"
                value={filteredData[0]?.student_no ? `: ${filteredData[0].student_no}` : ""}
                readOnly
                style={{
                  color: "black",
                  width: "98%",
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '12px',
                  border: "none",
                  outline: "none",
                  background: "none"
                }}
              />
              </td>
              
              
              <td
                colSpan={3}
                style={{

                  fontSize: "62.5%",

                }}
              >
                <input
                  type="text"
                  value={"College "}
                  readOnly
                  style={{
                    fontWeight: "Bold",
                    color: "black",
                    width: "98%",
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    border: "none",
                    outline: "none",
                    background: "none"
                  }}
                />
              </td>
              

              
              <td
                colSpan={14}
                style={{

                  fontSize: "62.5%",

                }}
              >
                <input
                  type="text"
                  value={filteredData[0]?.college ? `: ${filteredData[0].college}` : ""}
                  readOnly
                  style={{
                    color: "black",
                    width: "98%",
                    border: "none",
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    outline: "none",
                    background: "none"
                  }}
                />
              </td>
              </tr>

              <tr>
                <td
                  colSpan={4}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Name"}
                    readOnly
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      color: "black",
                      fontWeight: "bold",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={13}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.name ? `: ${filteredData[0].name}` : ""}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={3}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Program"}
                    readOnly
                    style={{
                      color: "black",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      width: "98%",
                      border: "none",
                      outline: "none",
                      fontWeight: "Bold",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={17}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.program ? `: ${filteredData[0].program}` : ""}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={4}
                  style={{

                    fontSize: "50%",

                  }}
                >
                  <input
                    type="text"
                    value={"Gender"}
                    readOnly
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={13}
                  style={{

                    fontSize: "50%",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.gender ? `: ${filteredData[0].gender}` : ""}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={10}
                  style={{

                    fontSize: "50%",

                  }}
                >
                  <input
                    type="text"
                    value={"Major       :"}
                    readOnly
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                

                <td
                  colSpan={7}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Curriculum"}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontWeight: "Bold",
                      border: "none",
                      textAlign: "left",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={6}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.curriculum ? `: ${filteredData[0].curriculum}` : ""}
                    readOnly
                    style={{
                      color: "black",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      width: "98%",
                      border: "none",
                      textAlign: "left",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>

              </tr>
              <tr>
                <td
                  colSpan={4}
                  style={{

                    fontSize: "50%",

                  }}
                >
                  <input
                    type="text"
                    value={"Age"}
                    readOnly
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={13}
                  style={{

                    fontSize: "50%",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.age ? `: ${filteredData[0].age}` : ""}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={4}
                  style={{

                    fontSize: "50%",

                  }}
                >
                  <input
                    type="text"
                    value={"Year Level"}
                    readOnly
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={6}

                  style={{

                    fontSize: "50%",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.year_level ? `: ${filteredData[0].year_level}`: ""}
                    readOnly
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={7}

                  style={{

                    fontSize: "50%",

                  }}
                >
                  <input
                    type="text"
                    value={"Scholarship/Discount"}
                    readOnly
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      outline: "none",
                      background: "none"
                    }}
                  />

                </td>
                <td
                  colSpan={6}

                  style={{

                    fontSize: "50%",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.scholarship_discount ? `: ${filteredData[0].scholarship_discount}` : ""}
                    readOnly
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>




              </tr>
              <tr>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "50%",

                  }}
                >
                  <input
                    type="text"
                    value={"Email Address"}
                    readOnly
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={20}
                  style={{

                    fontSize: "50%",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.email_address ? `: ${filteredData[0].email_address}`: ""}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      background: "none"
                    }}
                  />
                </td>





              </tr>

              <tr>

              </tr>
              <tr>

                <td
                  colSpan={6}
                  rowSpan={2}
                  style={{
                    color: "black",
                    height: "0.3in",
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    fontWeight: "bold",

                    backgroundColor: "gray",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  CODE
                </td>
                <td
                  colSpan={10}
                  rowSpan={2}
                  style={{
                    color: "black",
                    height: "0.3in",
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    fontWeight: "bold",

                    backgroundColor: "gray",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  SUBJECT TITLE
                </td>

                <td
                  colSpan={6}
                  style={{
                    color: "black",
                    height: "0.3in",
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    fontWeight: "bold",

                    backgroundColor: "gray",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  UNIT
                </td>

                <td
                  colSpan={4}
                  rowSpan={2}
                  style={{
                    color: "black",
                    height: "0.3in",
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    fontWeight: "bold",

                    backgroundColor: "gray",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  SECTION
                </td>
                <td
                  colSpan={8}
                  rowSpan={2}
                  style={{
                    color: "black",
                    height: "0.3in",
                    fontSize: "12px",
                    fontWeight: "bold",
                    backgroundColor: "gray",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  SCHEDULE/ROOM

                </td>
                <td
                  colSpan={8}
                  rowSpan={2}
                  style={{
                    color: "black",
                    height: "0.3in",
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    fontWeight: "bold",

                    backgroundColor: "gray",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  FACULTY
                </td>
              </tr>
              <tr>
                <td
                  colSpan={1}
                  style={{
                    color: "black",
                    height: "0.1in",
                    fontSize: "50%",
                    backgroundColor: "gray",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  Lec
                </td>

                <td
                  colSpan={1}
                  style={{
                    color: "black",
                    height: "0.1in",
                    fontSize: "50%",
                    backgroundColor: "gray",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  Lab
                </td>
                <td
                  colSpan={2}
                  style={{
                    color: "black",
                    height: "0.1in",
                    fontSize: "50%",
                    backgroundColor: "gray",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  Credit
                </td>
                <td
                  colSpan={2}
                  style={{
                    color: "black",
                    height: "0.1in",
                    fontSize: "50%",
                    backgroundColor: "gray",
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  
                  Tuition
                </td>
              </tr>
              {Array.from({ length: 12 }).map((_, index) => {  // change length for rows
                const item = filteredData[index] || {};
                return (
                  <tr key={index}>
                    <td
                      colSpan={6}
                      style={{
                        height: "0.25in",
                        fontSize: "62.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.subject_code || ""}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>

                    

                    
                    <td
                      colSpan={10}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.subject_title || ""}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={1}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.lec_units || ""}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={1}
                      style={{
                        height: "0.25in",
                        fontSize: "62.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.lab_units || ""}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={2}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.credit_units || ""}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={2}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.tuition_units || ""}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={4}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.subject_section || ""}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={8}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.subject_schedule_room || ""}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={8}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.subject_faculty || ""}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                  </tr>
                );
              })}


              {Array.from({ length: 1 }).map((_, index) => {  // change length for rows
                const item = filteredData[index] || {};
                return (
                  <tr key={index}>
                    <td
                      colSpan={6}
                      style={{
                        height: "0.25in",
                        fontSize: "62.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.eligibilityName || "IAASLAB1"}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>

                    

                    
                    <td
                      colSpan={10}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.eligibilityRating || "Information Assurance and Security 1 (Laboratory)"}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={1}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.eligibilityDateOfExam || "0"}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={1}
                      style={{
                        height: "0.25in",
                        fontSize: "62.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.eligibilityPlaceOfExam || "1"}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={2}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.licenseNumber || "1"}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={2}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.DateOfValidity || "1"}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={4}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.DateOfValidity || "BSINFOTECH 3C"}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={8}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.DateOfValidity || "S 10:00AM-01:00PM"}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                    <td
                      colSpan={8}
                      style={{
                        height: "0.25in",
                        fontSize: "52.5%",
                        border: "1px solid black"
                      }}
                    >
                      <input
                        type="text"
                        value={item.DateOfValidity || "RUTAQUIO, LARRY"}
                        readOnly
                        style={{
                          color: "black",
                          width: "98%",
                          textAlign: "center",
                          fontSize: "0.45rem",
                          border: "none",
                          outline: "none",
                          background: "none"
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
  

              <tr>
                <td
                  colSpan={20}
                  style={{

                    fontSize: "62.5%",
                    border: "1px solid black",
                    backgroundColor: "gray",
                  }}
                >
                  <input
                    type="text"
                    value={"A S S E S S E D  F E E S"}
                    readOnly
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      textAlign: "center",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={8}

                  style={{
                    color: "white",


                    fontSize: "62.5%",
                    color: "black",
                    border: "1px 0px 1px 1px solid black",
                    textAlign: "center",
                  }}
                >

                </td>
              </tr>



              <tr>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Tuition (21 unit(s)) "}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",

                    borderRight: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.tuition ? `${filteredData[0].tuition}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>



                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >

                  <input
                    type="text"
                    value={"RULES OF REFUND"}
                    readOnly
                    style={{
                      textAlign: "center",
                      color: "black",
                      marginLeft: "40px",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '10px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>
              <tr>

              </tr>
              <tr>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Athletic Fee"}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",

                    borderRight: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.athletic_fee ? `${filteredData[0].athletic_fee}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >

                  <input
                    type="text"
                    value={"1. Full refund of tuition fee - Before the start of classes"}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      marginLeft: "40px",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '10px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Cultural Fee"}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",

                    borderRight: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.cultural_fee ? `${filteredData[0].cultural_fee}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={18}
                  style={{

                    fontSize: "62.5%",

                  }}
                >

                  <input
                    type="text"
                    value={"2. 80% refund of tuition fee - within 1 week from the start of classes"}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      marginLeft: "40px",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '10px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Developmental Fee"}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",

                    borderRight: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.development_fee ? `${filteredData[0].development_fee}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >

                  <input
                    type="text"
                    value={"3. 50% refund - within 2 weeks from the start of classes."}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      marginLeft: "40px",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '10px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Guidance Fee"}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",

                    borderRight: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.guidance_fee ? `${filteredData[0].guidance_fee}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >

                  <input
                    type="text"
                    value={"4. No refund - after the 2nd week of classes."}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      marginLeft: "40px",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '10px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Library Fee"}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",

                    borderRight: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.library_fee ? `${filteredData[0].library_fee}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>

              </tr>
              <tr>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Medical and Dental Fee"}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",

                    borderRight: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.medical_dental_fee ? `${filteredData[0].medical_dental_fee}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={20}
                  style={{

                    fontSize: "62.5%",

                  }}
                >

                  <input
                    type="text"
                    value={"PLEDGE UPON ADMISSION"}
                    readOnly
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Registration Fee"}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",

                    borderRight: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.registration_fee ? `${filteredData[0].registration_fee}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={20}
                  style={{

                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black",
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '10px',
                  }}
                >
                  "As a student of EARIST, I do solemnly promise that I will
                </td>


              </tr>
              <tr>
                <td
                  colSpan={15}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Computer Fee"}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",

                    borderRight: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.computer_fee ? `${filteredData[0].computer_fee}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      width: "98%",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={20}
                  style={{

                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black",
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '10px',
                  }}
                >
                  comply with the rules and regulations of the Institution."
                </td>

              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{

                    fontSize: "62.5%",
                    marginRight: "20px",

                  }}
                >
                  <input
                    type="text"
                    value={""}
                    readOnly
                    style={{

                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={13}
                  style={{

                    fontSize: "62.5%",
                    marginRight: "20px",


                  }}
                >
                  <input
                    type="text"
                    value={""}
                    readOnly
                    style={{

                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",
                    marginRight: "20px",

                    borderRight: "1px solid black",
                  }}
                >
                  <input
                    type="text"
                    value={""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>

              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{


                    marginRight: "20px",

                  }}
                >

                </td>
                <td
                  colSpan={13}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Total Assessment : "}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",
                    marginRight: "20px",

                    borderRight: "1px solid black",
                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.total_assessment ? `${filteredData[0].total_assessment}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>

              </tr>

              <tr>
                <td
                  colSpan={2}
                  style={{


                    marginRight: "20px",

                  }}
                >

                </td>
                <td
                  colSpan={13}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Less Financial Aid : "}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",
                    marginRight: "20px",

                    borderRight: "1px solid black",
                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.less_financial_aid ? `${filteredData[0].less_financial_aid}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>


              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{
                    fontSize: "62.5%",
                    marginRight: "20px",

                    borderRight: "1px solid black",
                  }}
                >

                </td>
                <td
                  colSpan={13}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Net Assessed : "}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",
                    marginRight: "20px",

                    borderRight: "1px solid black",
                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.net_assessed ? `${filteredData[0].net_assessed}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                

                <td
                  colSpan={20}

                >
                  <input
                    type="text"
                    value={"_________________________________"}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      textDecoration: "underline",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{


                    marginRight: "20px",

                  }}
                >

                </td>
                <td
                  colSpan={13}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Credit Memo : "}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",
                    marginRight: "20px",

                    borderRight: "1px solid black",
                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.credit_memo ? `${filteredData[0].credit_memo}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>




                <td
                  colSpan={20}

                >
                  <input
                    type="text"
                    value={"Student's Signature"}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{


                    marginRight: "20px",

                  }}
                >

                </td>
                <td
                  colSpan={13}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Total_Discount: "}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",
                    marginRight: "20px",

                    borderRight: "1px solid black",
                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.total_discount ? `${filteredData[0].total_discount}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>

              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{


                    marginRight: "20px",

                  }}
                >

                </td>
                <td
                  colSpan={13}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Total Payment: "}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",
                    marginRight: "20px",

                    borderRight: "1px solid black",
                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.total_payment ? `${filteredData[0].total_payment}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>

              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{


                    marginRight: "20px",

                  }}
                >

                </td>
                <td
                  colSpan={13}
                  style={{

                    fontSize: "62.5%",

                  }}
                >
                  <input
                    type="text"
                    value={"Outstanding Fee : "}
                    readOnly
                    style={{
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={5}
                  style={{

                    fontSize: "62.5%",
                    marginRight: "20px",

                    borderRight: "1px solid black",
                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.outstanding_balance ? `${filteredData[0].outstanding_balance}` : ""}
                    readOnly
                    style={{
                      textAlign: "left",
                      color: "black",
                      width: "98%",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>

              </tr>
              <tr>
                <td
                  colSpan={20}
                  style={{

                    fontSize: "62.5%",
                    border: "1px solid black",
                    backgroundColor: "gray",
                  }}
                >
                  <input
                    type="text"
                    value={"A S S E S S E D  F E E S"}
                    readOnly
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      textAlign: "center",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>


                <td
                  colSpan={6}
                  style={{

                    fontSize: "62.5%",


                  }}
                >
                  <input
                    type="text"
                    value={"APPROVED BY : "}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "left",
                      marginLeft: "20px",
                      fontWeight: "bold",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={10}
                  style={{

                    fontSize: "55%",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "3.5rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                      position: "relative",

                    }}
                  >
                    {uploadedSignature ? (
                      <img
                        src={uploadedSignature}
                        alt="Signature"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <label
                        htmlFor="signatureUpload"
                        style={{
                          fontSize: "10px",
                          color: "gray",
                          cursor: "pointer",
                          padding: "5px",
                        }}
                      >
                        Click to upload your Signature
                      </label>
                    )}
                  </div>

                  {/* Hidden File Input */}
                  <input
                    id="signatureUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleSignatureUpload}
                    style={{
                      display: "none",
                    }}
                  />
                </td>

              </tr>

              <tr>
                <td
                  colSpan={7}
                  style={{

                    fontSize: "62.5%",
                    border: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={"1st Payment/Due"}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={6}
                  style={{


                    border: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={"2nd Payment/Due"}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={7}
                  style={{


                    border: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={"3rd Payment/Due"}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={20}
                  style={{

                    fontSize: "62.5%",


                  }}
                >
                  <input
                    type="text"
                    value={"_______________________________"}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      textDecoration: "underline",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>


              <tr>
                <td
                  colSpan={7}
                  style={{

                    fontSize: "62.5%",
                    border: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={"0.0"}
                    readOnly
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      textAlign: "center",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={6}
                  style={{

                    fontSize: "62.5%",
                    border: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={"0.0"}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontWeight: "bold",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={7}
                  style={{

                    fontSize: "62.5%",
                    border: "1px solid black",

                  }}
                >
                  <input
                    type="text"
                    value={"0.0"}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      width: "98%",
                      fontWeight: "bold",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={20}
                  style={{

                    fontSize: "12px",


                  }}
                >
                  <input
                    type="text"
                    value={"Registrar"}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      width: "98%",
                      fontWeight: "bold",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      border: "none",
                      fontWeight: "bold",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>

              </tr>
              <tr>
                <td
                  colSpan={12}
                  style={{

                    fontSize: "62.5%",


                  }}
                >
                  <input
                    type="text"
                    value={"Payment/Validation Date : "}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      width: "98%",
                      fontWeight: "bold",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={7}
                  style={{
                    height: "0.3in",
                    fontSize: "62.5%",


                  }}
                >
                  <input
                    type="text"
                    value={"February 24, 2025"}
                    readOnly
                    style={{
                      textDecoration: "underline",
                      color: "black",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      fontWeight: "bold",
                      textAlign: "center",
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={12}
                  style={{

                    fontSize: "62.5%",


                  }}
                >
                  <input
                    type="text"
                    value={"Official Receipt :"}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      width: "98%",
                      fontWeight: "bold",
                      border: "none",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
                <td
                  colSpan={7}
                  style={{

                    fontSize: "62.5%",


                  }}
                >
                  <input
                    type="text"
                    value={filteredData[0]?.official_receipt ? `${filteredData[0].official_receipt}` : ""}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "center",
                      width: "98%",
                      fontWeight: "bold",
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '12px',
                      border: "none",
                      outline: "none",
                      background: "none"
                    }}
                  />
                </td>
              </tr>



              <tr>
                <td style={{ width: "20%", textAlign: "center" }}>
                  <img src={FreeTuitionImage} alt="EARIST MIS FEE" style={{ marginTop: "10px", width: "200px", height: "150px", marginLeft: "150px" }} />
                </td>
              </tr>

              <tr>
                <td
                  colSpan={42}
                  style={{
                    height: "0.25in",
                    fontSize: "62.5%",
                    textAlign: "right",
                    textAlign: "right",
                    verticalAlign: "middle", // Centers vertically
                  }}
                >
                  <input
                    type="text"
                    value={currentDate}
                    readOnly
                    style={{
                      color: "black",
                      textAlign: "right", // Centers text inside the input
                      width: "98%",
                      border: "none",
                      outline: "none",
                      background: "none",
                    }}
                  />
                </td>
              </tr>































              <tr>
                <td
                  colSpan={42}
                  style={{
                    height: "0.2in",
                    fontSize: "72.5%",
                    backgroundColor: "gray",
                    color: "white",
                  }}
                >
                  <b>
                    <i style={{ color: "black", textAlign: "center", display: "block" }}>
                      KEEP THIS CERTIFICATE. YOU WILL BE REQUIRED TO PRESENT THIS IN ALL YOUR DEALINGS WITH THE COLLEGE.
                    </i>
                  </b>
                </td>
              </tr>

            </tbody>

          </table>


        </form>
      </div>
    </div>

  );
};

export default CertificateOfRegistration;
