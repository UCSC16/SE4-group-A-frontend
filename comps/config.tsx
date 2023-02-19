const backend =
  process.env.NODE_ENV === "production"
    ? "http://35.192.153.99:5000"
    : "http://35.192.153.99:5000";

export default backend;
