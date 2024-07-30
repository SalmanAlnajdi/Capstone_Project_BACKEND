function ensureReceiver(req, res, next) {
  if ((req.user && req.user.role === "receiver") || req.user.role === "Admin") {
    next();
  } else {
    next({ message: "You are not receiver!!!!" });
  }
}

module.exports = { ensureReceiver };
