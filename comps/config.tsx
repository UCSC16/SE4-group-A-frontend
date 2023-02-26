const devURL = "http://localhost:5000";
const prodURL = process.env.NEXT_PUBLIC_PROD_URL || devURL;

const backend =
  process.env.NODE_ENV === "production" ? prodURL : devURL;

export default backend;
