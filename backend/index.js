const app = require("./app");

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server started at port - ${port}`);
});