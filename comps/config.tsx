const backend =
  process.env.NODE_ENV === "production"
    ? "https://api.example.com"
    : "https://localhost:7086";

export default backend;
