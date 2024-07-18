function ensureAdmin(req, res, next) {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    next({ message: "You are not admin!!!!" });
  }
}

module.exports = { ensureAdmin };
