import jwt from "jsonwebtoken"
export const generateToken = (userId, res)=> {
    //create a token
    const token = jwt.sign({userId}, process.env.JWT_TOKEN,{
        expiresIn: "7d"
    })
    //debugging 
    console.log('Token generated');
    //create cookie
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'development' ? 'strict' : 'none',
        secure: true
    })
    // return cookie 
    return token
}