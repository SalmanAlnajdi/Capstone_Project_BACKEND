function ensureUser(req, res, next) {
  if ((req.user && req.user.role === "User") || req.user.role === "Admin") {
    next();
  } else {
    next({ message: "You are not user!!!!" });
  }
}

module.exports = { ensureUser };
