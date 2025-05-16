import express, { Router } from 'express';

const router = Router();
router.get("/", (req, res) => {
  res.send("Hello World!");
});

const app = express();
app.use("/", router);
const PORT = process.env.PORT || 3e3;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
