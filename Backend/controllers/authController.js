import authModel from "../models/authModel.js";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmailtoUser } from "../config/EmailTemplate.js";

class authController {
  static userRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      if (name && email && password) {
        const isUser = await authModel.findOne({ email: email });
        if (isUser) {
          return res.status(400).json({ message: "User Already Exists" });
        }
        
        // Password Hashing
        const genSalt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, genSalt);
  
        // Generate Token
        const token = jwt.sign(
          { email: email }, 
          process.env.JWT_SECRET, // Fix: Remove quotes around process.env
          { expiresIn: "10m" }
        );
  
        // Fix: Template literal syntax
        const link = `${process.env.BASE_URL}/api/auth/verify/${token}`;
        
        await sendEmailtoUser(link, email, name, password);
  
        const newUser = authModel({
          name,
          email,
          password: hashedPassword,
          isVerified: false,
        });
  
        const resUser = await newUser.save();
        return res.status(201).json({ 
          message: "Registered Successfully! Please check your email for verification.",
          user: resUser 
        });
      } 
      return res.status(400).json({ message: "All fields are required" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  
  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isUser = await authModel.findOne({ email: email });
        if (isUser) {
          const isVerifiedProfile = await authModel.findById(isUser._id);
          if (isVerifiedProfile.isVerified) {
            if (
              email === isUser.email &&
              (await bcryptjs.compare(password, isUser.password))
            ) {
              const token = jwt.sign(
                { userID: isUser._id },
                "process.env.JWT_SECRET",
                { expiresIn: "2d" }
              );
              return res.status(200).json({
                message: "Login Successfully",
                token,
                name: isUser.name,
                email: isUser.email,
              });
            } else {
              return res.status(400).json({ message: "Invalid Credentials!" });
            }
          } else {
            return res
              .status(400)
              .json({ message: "Email Verification Pending" });
          }
        } else {
          return res.status(400).json({ message: "User Not Registered!" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static changePassword = async (req, res) => {
    const { newpassword, confirmpassword } = req.body;
    try {
      if (newpassword === confirmpassword) {
        const gensalt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newpassword, gensalt);
        await authModel.findByIdAndUpdate(req.user._id, {
          password: hashedPassword,
        });
        return res
          .status(200)
          .json({ message: "password Changed Successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "password and confirm password does not match" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
      if (email) {
        const isUser = await authModel.findOne({ email: email });
        if (isUser) {
          // generate token
          const secretKey = isUser._id + "process.env.JWT_SECRET";
          const token = jwt.sign({ userID: isUser._id }, secretKey, {
            expiresIn: "5m",
          });
  
          const link = `http://15.207.19.75:3000/user/reset/${isUser._id}/${token}`;
  
          // email sending
          const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
  
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `Password Reset Request`,
            html: `
              <!doctype html>
              <html lang="en-US">
              <head>
                  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                  <title>Reset Password Email</title>
                  <meta name="description" content="Reset Password Email Template.">
                  <style type="text/css">
                      a:hover {text-decoration: underline !important;}
                  </style>
              </head>
              <body style="margin: 0px; background-color: #f2f3f8;">
                  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8">
                      <tr>
                          <td>
                              <table style="max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                  <tr>
                                      <td style="text-align:center;">
                                          <h1 style="color:#1e1e2d; font-weight:500; font-size:32px;">You have requested to reset your password</h1>
                                          <p style="color:#455056; font-size:15px;">To reset your password, click the following link and follow the instructions.</p>
                                          <a href="${link}" style="background:#20e277; color:#fff; padding:10px 24px; border-radius:50px; text-transform:uppercase; text-decoration:none;">Reset Password</a>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </body>
              </html>`,
          };

          // Send email
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              // Return a response indicating the failure to send the email
              return res.status(400).json({ message: "Failed to send email. Please try again." });
            }
            // Success: email sent
            return res.status(200).json({ message: "Email Sent" });
          });
        } else {
          return res.status(400).json({ message: "Invalid Email" });
        }
      } else {
        return res.status(400).json({ message: "Email is required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  

  // Password Reset Functionality
  static forgetPasswordEmail = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const { id, token } = req.params;

    try {
      if (newPassword && confirmPassword && id && token) {
        if (newPassword === confirmPassword) {
          // Verify token
          const isUser = await authModel.findById(id);
          if (!isUser) {
            return res.status(400).json({ message: "User not found" });
          }

          const secretKey = isUser._id + "process.env.JWT_SECRET";
          try {
            const isValid = jwt.verify(token, secretKey);
          } catch (error) {
            if (error.name === 'TokenExpiredError') {
              return res.status(400).json({ message: "Link has expired" });
            }
            return res.status(400).json({ message: "Invalid token" });
          }

          // Hash new password
          const genSalt = await bcryptjs.genSalt(10);
          const hashedPass = await bcryptjs.hash(newPassword, genSalt);

          // Update password
          const isSuccess = await authModel.findByIdAndUpdate(isUser._id, {
            $set: { password: hashedPass },
          });

          if (isSuccess) {
            return res.status(200).json({ message: "Password Changed Successfully" });
          } else {
            return res.status(400).json({ message: "Failed to update password" });
          }
        } else {
          return res
            .status(400)
            .json({ message: "Password and Confirm Password do not match" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

static saveVerifiedEmail = async (req, res) => {
  const { token } = req.params;
  try {
    if (!token) {
      console.log('No token provided');
      return res.redirect(`${process.env.FRONTEND_URL}/VerificationFailed`);
    }

    const isEmailVerified = jwt.verify(token, process.env.JWT_SECRET); // Fix: Remove quotes
    if (!isEmailVerified) {
      console.log('Invalid token');
      return res.redirect(`${process.env.FRONTEND_URL}/VerificationFailed`);
    }

    const getUser = await authModel.findOne({ email: isEmailVerified.email });
    if (!getUser) {
      console.log('User not found');
      return res.redirect(`${process.env.FRONTEND_URL}/VerificationFailed`);
    }

    const saveEmail = await authModel.findByIdAndUpdate(
      getUser._id,
      { $set: { isVerified: true } },
      { new: true }
    );

    if (saveEmail) {
      console.log('Email verification successful');
      return res.redirect(`${process.env.FRONTEND_URL}/VerificationSuccess`);
    }

    console.log('Failed to update user');
    return res.redirect(`${process.env.FRONTEND_URL}/VerificationFailed`);
  } catch (error) {
    console.error('Error in saveVerifiedEmail:', error);
    return res.redirect(`${process.env.FRONTEND_URL}/VerificationFailed`);
  }
};


  // start Course email send
  static courseEmail = async(req,res)=>{
    const { email } = req.body;
    try {
      if (email) {
        const isUser = await authModel.findOne({ email: email });
        if (isUser) {
          // generate token
          const secretKey = isUser._id + "process.env.JWT_SECRET";
          const token = jwt.sign({ userID: isUser._id }, secretKey, {
            expiresIn: "5m",
          });
  
          const link = `http://15.207.19.75:9000/user/sendEmail/${isUser._id}/${token}`;
          
  
          // email sending
          const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
  
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `Purchased Order Successfully`,
            html: `
              <!doctype html>
              <html lang="en-US">
              <head>
                  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                  <title>Reset Password Email</title>
                  <meta name="description" content="Reset Password Email Template.">
                  <style type="text/css">
                      a:hover {text-decoration: underline !important;}
                  </style>
              </head>
              <body style="margin: 0px; background-color: #f2f3f8;">
                  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8">
                      <tr>
                          <td>
                              <table style="max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                  <tr>
                                      <td style="text-align:center;">
                                          <h1 style="color:#1e1e2d; font-weight:500; font-size:32px;">Course Name:Html Course</h1>
                                          <p style="color:#455056; font-size:15px;">Course Price: 12345</p>
                                          <p style="color:#455056; font-size:15px;">Remark:Maje Kar Bhai Ab....</p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </body>
              </html>`,
          };

          // Send email
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              // Return a response indicating the failure to send the email
              return res.status(400).json({ message: "Failed to send email. Please try again." });
            }
            // Success: email sent
            return res.status(200).json({ message: "Email Sent" });
          });
        } else {
          return res.status(400).json({ message: "Invalid Email" });
        }
      } else {
        return res.status(400).json({ message: "Email is required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  //end Course email send



  //change password
  static newPassword = async (req, res) => {
    const { email } = req.body;
    try {
      if (email) {
        const isUser = await authModel.findOne({ email: email });
        if (isUser) {
          // generate token
          const secretKey = isUser._id + "process.env.JWT_SECRET";
          const token = jwt.sign({ userID: isUser._id }, secretKey, {
            expiresIn: "5m",
          });
  
          const link = `http://15.207.19.75:3000/user/reset/${isUser._id}/${token}`;
  
          // email sending
          const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
  
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `Change Password`,
            html: `
              <!doctype html>
              <html lang="en-US">
              <head>
                  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                  <title>Change Password Email</title>
                  <meta name="description" content="Reset Password Email Template.">
                  <style type="text/css">
                      a:hover {text-decoration: underline !important;}
                  </style>
              </head>
              <body style="margin: 0px; background-color: #f2f3f8;">
                  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8">
                      <tr>
                          <td>
                              <table style="max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                  <tr>
                                      <td style="text-align:center;">
                                          <h1 style="color:#1e1e2d; font-weight:500; font-size:32px;">You have requested to reset your password</h1>
                                          <p style="color:#455056; font-size:15px;">To Change your password, click the following link and follow the instructions.</p>
                                          <a href="${link}" style="background:#20e277; color:#fff; padding:10px 24px; border-radius:50px; text-transform:uppercase; text-decoration:none;">Change Password</a>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </body>
              </html>`,
          };

          // Send email
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              // Return a response indicating the failure to send the email
              return res.status(400).json({ message: "Failed to send email. Please try again." });
            }
            // Success: email sent
            return res.status(200).json({ message: "Email Sent" });
          });
        } else {
          return res.status(400).json({ message: "Invalid Email" });
        }
      } else {
        return res.status(400).json({ message: "Email is required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  
}

export default authController;
