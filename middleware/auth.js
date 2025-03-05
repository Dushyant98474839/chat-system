import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    // console.log("Cookies: ", req.cookies);
    // console.log("JWT Token: ", req.cookies?.jwt);

    console.log("token");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded; // Attach decoded user to request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
