const user = require('../models/user')

module.exports.signupRender = ((req,res)=>{
    res.render('./user/signup.ejs')
});


module.exports.signupDb = async (req,res)=>{
    try{
        let {username, email, password} = req.body;
        const newuser= new user({email,username});
        const registeruser=await user.register(newuser,password);
        console.log(registeruser);
        req.logIn(registeruser, (err)=>{
        if (err) {return next(err);}
        req.flash('success','You are Logged In')
        res.redirect('/listings')
        });
    } catch (e){
        req.flash('error',e.message);
        res.redirect('/signup');
    }

};

module.exports.loginRender = (req,res)=>{
    res.render('./user/login.ejs');
};


module.exports.loginDb = async (req,res) =>{
    req.flash('success','Welcome back to WonderLust!');
    let reUrl = res.locals.redirectUrl || '/listings'
    res.redirect(reUrl);

};

module.exports.logOut = (req,res)=>{
    req.logOut((err)=>{ 
        if (err) {
            return next(err);
        }
        req.flash('success','You are Logged Out')
        res.redirect('/listings')
    })
};