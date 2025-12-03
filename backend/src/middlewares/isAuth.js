import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "unauthenticated",
      });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken) {
      return res.status(400).json({
        success: false,
        message: "token not verified",
      });
    }
    console.log(decodeToken);
    req.userId = decodeToken?.userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "isAuth error",
    });
  }
};

export default isAuth;
