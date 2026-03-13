import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`SecureVault API is running!`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`-----------------------------------------`);
});