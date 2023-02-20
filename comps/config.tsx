const devURL = "http://localhost:5000";
const prodURL = process.env.REACT_APP_PROD_URL || "http://35.192.153.99:5000";

const backend =
  process.env.NODE_ENV === "production" ? prodURL : "http://35.192.153.99:5000";

//   const backend =
// process.env.NODE_ENV === "production"
//   ? "http://35.192.153.99:5000"
//   : "http://35.192.153.99:5000";

export default backend;
