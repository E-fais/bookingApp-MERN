import jwt from "jsonwebtoken";

export const usreAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (token) {      
      jwt.verify(token, process.env.SECRET, {}, async (err, userDoc) => {
      if (err) return res.status(400).json({ message: "YOU NOT ALLOWED", err });
      req.userId = userDoc.id;
      next();
      })
    }else return res.status(400).json({ message: "THERE IS NO TOKEN"});
  } catch (error) {
    console.log(error);
  }
};

