function healthCheck(req, res) {
  res.status(200).json({
    status: "ok",
    message: "CasaCerta API ativa",
  });
}

module.exports = {
  healthCheck,
};
