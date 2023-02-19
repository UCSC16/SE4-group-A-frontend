const backend =
  process.env.NODE_ENV === "production"
    ? "10.5.0.7:80"
    : "10.5.0.7:80";

export default backend;
