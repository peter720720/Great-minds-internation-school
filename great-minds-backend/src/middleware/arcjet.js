// 1. Import the root package object
const arcjetPackage = require("@arcjet/node");

// 2. Extract arcjet from the .default wrapper, and rules from the root level
const createArcjet = arcjetPackage.default?.arcjet;
const { shield, detectBot } = arcjetPackage;

// Instantiate the SDK 
const aj = process.env.ARCJET_KEY && createArcjet ? createArcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({ mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN", allow: ["CATEGORY:SEARCH_ENGINE"] })
    ],
}) : null;

module.exports = async (req, res, next) => {
    if (process.env.NODE_ENV !== "production" && req.path === "/api/admin/upload") return next();
    if (!aj) return next();
    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()) {
            return res.status(403).json({ message: "Access Denied by System Security Firewalls." });
        }
        next();
    } catch (err) {
        // Fallthrough catches runtime connection timeouts so the application never drops line
        next(); 
    }
};
