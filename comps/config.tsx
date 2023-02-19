const backend =
  process.env.NODE_ENV === "production"
    ? "http://10.5.0.7:80"
    : "http://10.5.0.7:80";

export default backend;
