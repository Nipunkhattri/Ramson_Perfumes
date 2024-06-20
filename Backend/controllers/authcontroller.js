import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AuthModel from '../models/authmodel.js'
import dotenv from 'dotenv'

dotenv.config();

/*Login User*/
export const LoginUser = async (req,res) =>{
    try {
        const {email,password} = req.body;
    
        const user = await AuthModel.findOne({ email: email });
        console.log(user);
    
        if (user == null) {
          return res.status(400).json({ message: "User not found.." });
        }
        
        const matchParrsword = await bcrypt.compare(password, user.Password);//Compare the Password
        if (!matchParrsword) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({  userId: user._id , role: user.role}, 'thisisproject', { expiresIn: '1h' });// Generating Token
        
        const user_data = {
          Username:user?.Username,
          email:user?.email
        }

        res.status(200).json({token:token , data:user_data , message:"Login successfull .."});
      } catch (error) {
        console.log(error);
      }
}

/*Register User*/
export const RegisterUser = async (req, res) => {
    try {
      const { email, password ,firstname,lastname } = req.body;
      console.log(email);
      // const ph = Phone;
      const Username = firstname + lastname;
  
      const user = await AuthModel.findOne({ email: email });
      console.log(user);
  
      if (user !== null) {
        return res.status(400).json({ message: "Already Registered" });
      }
  
      const saltRounds = 10;
      // Generate a salt
      const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
              console.error("Error generating salt:", err);
              reject(err);
            }
    
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                console.error("Error hashing password:", err);
                reject(err);
              }
              resolve(hash);
            });
          });
        });
  
      const result = await AuthModel.create({
        email: email,
        Password: hashedPassword,
        Username:Username
      });
  
      console.log(result);
  
      res.status(200).json({ message: "Registered Successfully" });
    } catch (error) {
      res.status(200).json({ message: "Something went wrong ! Try again" });
      console.log(error);
    }
  };