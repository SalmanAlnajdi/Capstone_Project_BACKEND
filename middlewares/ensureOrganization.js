// middlewares/ensureOrganization.js
function ensureOrganization(req, res, next) {
  if (
    (req.user && req.user.role === "Organization") ||
    req.user.role === "Admin"
  ) {
    console.log("approved");
    next();
  } else {
    console.log("not app");
    next({ message: "You are not organization!!!!" });
  }
}

module.exports = { ensureOrganization };
