import cors from "cors";
import express from "express";
import "dotenv/config";

import userRoute from "../routes/user.route.js";
import reportMiddleware from "../middlewares/reportMiddleware.js";

const app = express();

app.use(express.json())
app.use(cors())
app.use(reportMiddleware)

app.use("/usuarios", userRoute);


app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status ?? 500;
  const message = err.status ? err.message : 'Internal server error';
  res.status(status).json({ message });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});


export default app
