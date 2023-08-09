let API_ROUTE;

process.env.NODE_ENV === "development"
  ? (API_ROUTE = "http://127.0.0.1:5000")
  : (API_ROUTE = `${process.env.REACT_APP_API}`);

export default API_ROUTE;
