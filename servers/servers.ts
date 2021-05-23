import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import md5 from "md5";
import jwt from "jsonwebtoken";

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/testDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    minLength: 4,
  },
  pw: {
    type: String,
    required: true,
    minLength: 4,
  },
  nickname: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 15,
  },
});

const User = mongoose.model("Users", userSchema);

app.post("/register", async (req: express.Request, res: express.Response) => {
  const { id, pw, nickname } = req.body;

  const user = new User({
    id: id,
    pw: md5(pw),
    nickname: nickname,
  });
  try {
    const result: any = await user.save();
    res.send(result.nickname);
  } catch (err) {
    if (err.keyPattern.id) res.send({ result: "duplicateId" });
    else if (err.keyPattern.nickname) res.send({ result: "duplicateNickname" });
  }
});
let decodeId: string;
const verifyJWT = (req: any, res: express.Response, next: any) => {
  const token = req.headers["x-access-token"].slice(1, -1);
  if (!token) {
    res.send("we need token give me next time");
  } else {
    jwt.verify(token, "jwtSecret", (err: any, decoded: any) => {
      if (err) {
        res.json({ auth: false, message: "you failed authenticate" });
      } else {
        decodeId = decoded.id;
        next();
      }
    });
  }
};

app.post("/isUserAuth", verifyJWT, async (req, res) => {
  const result: any = await User.findOne({ id: decodeId }, { nickname: 1 });
  res.json({
    auth: true,
    info: result.nickname,
  });
});

app.post("/login", async (req: express.Request, res: express.Response) => {
  const { id, pw } = req.body;
  try {
    const result: any = await User.findOne(
      { id: id, pw: md5(pw) },
      { id: 1, nickname: 1 }
    );
    const userId = result.id;
    const token = jwt.sign({ id }, "jwtSecret", {
      //5분 지나면 만료
      expiresIn: 300,
    });

    if (result === null)
      res.json({ auth: false, message: "아이디 비번 일치하지않습니다" });
    else {
      res.json({ auth: true, token: token, result: result });
    }
    // else res.send(result.nickname);
  } catch (error) {
    console.log(error);
  }
});
app.listen(3001, () => console.log("listen 3001"));
