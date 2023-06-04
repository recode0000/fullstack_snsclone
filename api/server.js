const express = require("express");
const app = express();
const PORT = 8080;
const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

// 新規ユーザー登録API
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  // bcryptでパスワードハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return res.json({ user });
});


// ユーザーログインAPI


app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));