
// ----------------register a new user------------------
//POST: api/users/register
const registerUser=(req,res,next)=>{
    res.json("Register User")
}


// ----------------login a registered user------------------
//POST: api/users/login
const loginUser=(req,res,next)=>{
    res.json("Login User")
}


// ----------------user profile------------------
//POST: api/users/:id
const getUser=(req,res,next)=>{
    res.json("User Profile")
}

// ----------------change user avatar(profile picture)------------------
//POST: api/users/change-avatar
const changeAvatar=(req,res,next)=>{
    res.json("Change user avatar")
}

// ----------------edit user details(from profile)------------------
//POST: api/users/edit-user
const editUser=(req,res,next)=>{
    res.json("Edit user details")
}

// ----------------get authors------------------
//POST: api/users/authors
const getAuthors=(req,res,next)=>{
    res.json("get all users/authors")
}

module.exports={registerUser,loginUser,getUser,changeAvatar,editUser,getAuthors}