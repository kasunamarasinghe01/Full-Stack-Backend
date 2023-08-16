require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;
const dbURL =
  process.env.MONGODB ||
  "mongodb+srv://kasun_anyq:kasun_anyq@cluster0.zl75ven.mongodb.net/Any_Q";

const app = require("./app");
const routes = require("./routes");
const AnswerModel = require("./model/answer-model");

mongoose
  .connect(dbURL)
  .then(() => {
    const server = app.listen(port, () => {
      console.log("DB connected", port);
    });

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    // SOCKET.IO setup
    const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:5000", // Adjust the origin as needed
      },
    });

    io.on("connection", (socket) => {
      console.log("socket connected");

      socket.on("questionnaire", async (qData) => {
        socket.join(qData.id);

        const data = await AnswerModel.find({ questionnaire: qData.id }).sort({
          marks: -1,
        });
        socket.emit("questionnaire", data);

        const changeStream = AnswerModel.watch();
        changeStream.on("change", async (next) => {
          const data = await AnswerModel.find({ questionnaire: qData.id }).sort(
            {
              marks: -1,
            }
          );
          socket.emit("questionnaire", data);
        });
      });
    });

    app.use((req, res, next) => {
      const apiKey = req.get("API-Key"); // Fixed typo here
      if (!apiKey || apiKey !== process.env.API_KEY) {
        res.status(401).json({ message: "unauthorized" });
      } else {
        next();
      }
    });

    app.use("/api", routes);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
