const express = require("express");
const morgan = require("morgan");
const connectDB = require("./database");
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

const cors = require("cors");
const path = require("path");
const userRouter = require("./apis/users/routes");
const organizationRouter = require("./apis/organization/routes");
const adminRouter = require("./apis/admin/routes");
const DonationRouter = require("./apis/donations/routes");
const eventRouter = require("./apis/event/routes");
const ReciverRouter = require("./apis/receiver/routes");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));

app.use(cors());

connectDB();

app.use(express.json());

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

const qrCodeRoute = require("./apis/qrcode/routes");
const AttendeeRouter = require("./apis/Attend/routes");

// Add your routes here
// Example: app.use('/users', usersRouter);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api", qrCodeRoute);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/organization", organizationRouter);
app.use("/donation", DonationRouter);
app.use("/event", eventRouter);
app.use("/receiver", ReciverRouter);
app.use("/attend", AttendeeRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
