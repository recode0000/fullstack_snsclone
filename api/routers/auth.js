const router = require("express").Router();
const bcrypt = require("bcrypt"); //パスワードハッシュ化
const jwt = require("jsonwebtoken"); // トークン発行
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 新規ユーザー登録API
router.post("/register", async (req, res) => {
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
router.post("/login", async(req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email }});

  if(!user) {
    return res.status(401).json({ error: "メールアドレスがパスワードが間違っています"  });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid) {
    return res.status(401).json({ error: "そのパスワードは間違っています" });
  }

  // JWT
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.json({ token });
});

module.exports = router;