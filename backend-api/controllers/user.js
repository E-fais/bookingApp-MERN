import UserModel from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const { userId } = req;
  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User dose not exist" });

    const { name, email, _id } = user;
    res.status(200).json({ name, email, _id });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ email, password: hashedPassword, name });

    const token = jwt.sign( { email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "5h" } );
    res.cookie("token", token, {
            httpOnly: true,
        })

    res.status(201).json({ result });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};



export const signin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const oldUser = await UserModel.findOne({ email });
    

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.SECRET, { expiresIn: "5h" });

    res.cookie("token", token, {
            httpOnly: true,
        });

    res.status(200).json({ result: oldUser });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// there is no need to doing this with backend
// you can just clear cookies in frontend
// i just add this to preserve your frontend structure
// you can change frontend logout logic and clear this
export const logout = async (req, res) => {
  res.cookie('token', '').json(true);
};