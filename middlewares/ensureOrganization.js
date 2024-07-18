function ensureOrganization(req, res, next) {
  if (
    (req.user && req.user.role === "Organization") ||
    req.user.role === "Admin"
  ) {
    next();
  } else {
    next({ message: "You are not organization!!!!" });
  }
}

module.exports = { ensureOrganization };
