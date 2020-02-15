const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const util = require("util")


exports.createResource  = (Model) => {
    return async(req, res, next) => {
        try{
            const newResource = await Model.create(req.body);
            res.status(200).json({
                status: "success",
                data: newResource
            })
        }catch(error){
            next(error);
        }
    }
}

exports.getOne = (Model) => async (req, res, next) => {
    try{
        //console.log("jk")
        console.log(req.query)
        let query = Model.findById(req.params.id);
        
        const item = req.query?await query.select(req.query):await query;

        res.status(200).json({
        status: 'success',
        item
        })
    }catch(error){
        console.log(error)
    }
}

exports.signup = (Model) => async (req, res, next) => {
    try{
        const newItem = await Model.create(
            req.body
        );
        createSendToken(newItem, 201, res);
    }catch(error){
        next(error)
    }
    
}


exports.login =(Model) => async (req, res, next) => {
    try{
        const {
            email,
            password
        } = req.body

        if (!email || !password) {
            return next(new AppError("Please enter email and password"), 400);
        }
        const item = await Model.findOne({
            email: email
        }).select("+password");
        
        if (!item || !await checkPassword(password, item.password)) {
            return next(new AppError("Please enter valid email and password", 400))
        }
        createSendToken(item, 201, res);
    }catch(error){
        next(error)
    }
}

const createSendToken = (item, statusCode, res) => {
    const token = signInToken(item._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        //httpOnly: true
    };

    res.cookie('jwt', token, cookieOptions);
    //console.log(res.cookie, "gjkgj")

    // Remove password from output
    item.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        item
    })
}

const signInToken = id => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const checkPassword = (Model) => async (enteredPassword, userPassword) =>{
    return await bcrypt.compare(enteredPassword, userPassword)
}

exports.encodePassword = (Model) => async (enteredPassword) => {
    return await bcrypt.hash(enteredPassword, 12)
}

exports.isLoggedIn = (Model) => async (req, res, next) => {
    try{
        if(req.cookies.jwt){
            let token = req.cookies.jwt
            console.log(token)
            if(!token){
                res.status(200).json({
                    state:false
                })
                return next()
            }
            const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
            res.status(200).json({
                state: true,
                token: token,
                id :decoded.id
            })
            return next()
        }
        res.status(200).json({
            state: false,
            token: null,
            id: null
        })
        return next()
    }catch(error){
        console.log(error)
    }
}

exports.logout = (Model) => async (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        status: 'success'
    });
}