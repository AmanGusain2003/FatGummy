import User from "../models/User.js";
import { generateToken } from "../utils/server.utils.js";
import { v4 as uuidv4 } from 'uuid';

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect = user.password == password; // Assuming you have a method to compare passwords
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    user.password = undefined;
    user.roomId = undefined
    let accessToken = "";
    accessToken = generateToken(user);
    return res.status(200).json({ accessToken, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { username, email, password, phone, gender, profileImage, themeColor, inviteToken } = req.body;
  try {
    let partnerId = null;
    
    // If there's an invite token, find the inviter
    if (inviteToken) {
      const inviter = await User.findOne({ inviteToken });
      if (!inviter) {
        return res.status(400).json({ error: "Invalid invite token" });
      }
      partnerId = inviter._id;
      inviter.partnerId = null; 
      await inviter.save();
    }

    const newInviteToken = uuidv4();
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password,
      phone,
      gender,
      profileImage,
      themeColor,
      partnerId,
      inviteToken: newInviteToken
    });

    await newUser.save();

    // Link inviter's partnerId to new user
    if (partnerId) {
      await User.findByIdAndUpdate(partnerId, { partnerId: newUser._id });
    }

    newUser.password = undefined;
    let accessToken = "";
    accessToken = generateToken(newUser);
    return res.status(201).json({ accessToken, user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { login, signup };
