const {
  createUser,
  fetchAllUser,
  updateUser,
  deleteUser,
    fetchUserWithEmail,
    register,
} = require("../repository/UserRepository");
const ResponseMessage = require("../constants/ResponseMessage");

// async function AddUser(req, res) {
//   const userData = {
//     username: req.body.username,
//     email: req.body.email,
//     cellphone: req.body.cellphone,
//     password: req.body.password,
//     friends: [],
//   };
//   try {
//     const user = await createUser(userData);

      
      

//     const registrationResult = await register(user.email, user.password);

//     res.status(201).json({
//       status: ResponseMessage.MSG_311,
//       message: "User created successfully",
//       data: user,
//       accessToken: registrationResult.accessToken,
//       refreshToken: registrationResult.refreshToken,
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }



/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints for user management
 */

/**
 * @swagger
 * /user/user/{id}:
 *   put:
 *     tags: [User]
 *     summary: Update user
 *     description: Update user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               cellphone:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User updated successfully
 *       '400':
 *         description: Bad request or user update failure
 */

async function UpdateUser(req, res) {
    const userData = {
    id: req.params.id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cellphone: req.body.cellphone,
  };
  try {
    console.log("Update user");
    const user = await updateUser(userData);
    console.log("user updated");
    res.status(201).json({
      status: ResponseMessage.MSG_312,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}





/**
 * @swagger
 * /user/user:
 *   get:
 *     tags: [User]
 *     summary: Fetch all users
 *     description: Fetch all users (Requires Access Token)
 *     parameters:
  *       - in: header 
  *         name: Authorization
  *         schema:
  *          type: string
  *          format: jwt
  *         description: JWT token
  *         required: true
  *     responses:
 *       '200':
 *         description: Users fetched successfully
 *       '401':
 *         description: Unauthorized access
 *       '403':
 *         description: Forbidden access
 *       '400':
 *         description: Bad request or user fetch failure

 */

async function FetchUser(req, res) {
  try {
    const user = await req.payload;

    const userData = await fetchAllUser(user);
    res.status(200).json({
      status: ResponseMessage.MSG_315,
      message: "User fetched successfully",
      data: userData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}



/**
 * @swagger
 * /user/user/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete user
 *     description: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Bad request or user deletion failure
 */
async function DeleteUser(req, res) {
  try {
    const userData = await deleteUser(req.params.id);

    res.status(200).json({
      status: ResponseMessage.MSG_313,
      message: "User deleted successfully",
      data: userData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}




/**
 * @swagger
 * /user/user/{email}:
 *   get:
 *     tags: [User]
 *     summary: Get user by email
 *     description: Get user by email address
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: User email
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: User found successfully
 *       '400':
 *         description: Bad request or user fetch by email failure
 */
async function getUserByEmail(req, res) {

  try {
    //console.log(req)
    console.log(`Try to get member from email : ${req.params.email}`);
    const memberData = await fetchUserWithEmail(req.params.email);
  
    console.log(`Got response`);
    if (memberData === null) {
      console.log(`MemberData is null on getMemberByEmail`);
      return res.status(400).json({
        msg_code: ResponseMessage.MSG_428,
        msg: "Membre introuvable",
      });
    }
    console.log(`Member found !`);
    return res
      .status(201)
      .json({ msg_code: ResponseMessage.MSG_429, data: memberData });
  } catch (error) {
    console.log(
      `An error occured while getting member from email : ${req.params.email}`
    );
    console.log(error);
    return res.status(400).json({
      msg_code: ResponseMessage.MSG_430,
      msg: "Error Fetching Member",
    });
  }
}

module.exports = {
//   AddUser,
  UpdateUser,
  FetchUser,
  DeleteUser,
  getUserByEmail,
  
};
