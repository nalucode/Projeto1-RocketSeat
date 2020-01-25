function verifyID(req, res, next) {
  projects.forEach((item, index) => {
    if (!item.id == req.params.id) {
      return res.status(400).json({
        error_code: 2,
        msg: "This project does not exist"
      });
    }
  });

  next();
}

module.exports = verifyID;
