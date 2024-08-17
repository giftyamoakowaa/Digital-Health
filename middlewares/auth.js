import jwt from 'jsonwebtoken';
import AdminModel from '../models/admin_models.js';

export const checkUserSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(' ')[1];  // Ensure correct split
            console.log('Token:', token);  // Debug log
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            console.log('Decoded User:', req.user);  // Debug log
            next();
        } catch (error) {
            console.error('Token verification error:', error.message);  // Debug log
            return res.status(401).json({ error: "Token Expired" });
        }
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
};
export default checkUserSession;

export const adminAuth = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      req.admin = decoded;

      // Retrieve user ID from token or session
      const userId = req.session?.user?.id || req.admin?.id;

      // Find the user in the AdminModel
      const user = await AdminModel.findById(userId);
      if (!user) {
          return res.status(404).send('User not found');
      }

      next();
  } catch (error) {
      res.status(400).send('Invalid token.');
  }
};


// export const adminAuth = (req, res, next) => {
//     const token = req.header('Authorization');
//   if (!token) return res.status(401).send('Access denied. No token provided.');

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
//     req.admin = decoded;
//     next();
//   } catch (error) {
//     res.status(400).send('Invalid token.');
//   }
// };



  



export const verifyJWT = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};



// export const verifyAdmin = (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     if (!token) return res.status(401).send('Access denied. No token provided.');
  
//     try {
//       const decoded = jwt.verify(token, 'your_jwt_secret');
//       req.admin = decoded;
//       next();
//     } catch (error) {
//       res.status(400).send('Invalid token');
//     }
//   };

// import jwt from "jsonwebtoken";

// export const checkUserSession = (req,res,next)=>{
//     if (req.session.user) {
//         next();
//     } else if (req.headers.authorization) {
//         try {
//             const token = req.headers.authorization.split('')[1]
//             req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

//             next()
//         } catch (error) {
//             return res.status(401).json({ error: "Token Expired"})
//         }
//     }
//     else {
//         res.status(401).json({error: 'Not authenticated'})
//     }
// };

// export default checkUserSession;
