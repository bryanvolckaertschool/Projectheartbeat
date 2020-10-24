const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Toegang Geweigerd!");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    //Req.user gelijk stellen aan de verified zodat je in de volgende middleware
    //de req.user kan gebruiken om te kijken wie de req heeft verstuurd.
    req.user = verified;
    //Volgende middleware
    next();
  } catch (err) {
    req.status(400).send("Foutieve token");
  }
};
