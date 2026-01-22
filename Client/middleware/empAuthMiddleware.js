const jwt = require("jsonwebtoken");

const empAuthMiddleware = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, "emp123");
        req.user = decoded; // { id: employee._id }
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = empAuthMiddleware;
