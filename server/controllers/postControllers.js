//--------------create a post-------------------
// POST: api/posts
const createPost=async (req,res,next)=>{
    res.json("Create post")
}



//--------------get all post-------------------
// GET: api/posts
const getPosts=async (req,res,next)=>{
    res.json("Get all posts")
}



//--------------get single post-------------------
// GET: api/posts/:id
const getPost=async (req,res,next)=>{
    res.json("Get single post")
}



//--------------get posts by category-------------------
// GET: api/posts/categories/:category
const getCategoryPost=async (req,res,next)=>{
    res.json("Get post by category")
}


//--------------get author post-------------------
// GET: api/posts/users/:id
const getUserPosts=async (req,res,next)=>{
    res.json("Get user posts")
}



//--------------edit post-------------------
// PATCH: api/posts/:id
const editPost=async (req,res,next)=>{
    res.json("Edit post")
}



//--------------delete post-------------------
// DELETE: api/posts/:id
const deletePost=async (req,res,next)=>{
    res.json("Delete post")
}

module.exports={createPost,getPosts,getPost,getCategoryPost,getUserPosts,editPost,deletePost}