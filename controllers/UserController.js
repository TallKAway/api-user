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

async function UpdateUser(req, res) {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cellphone: req.body.cellphone,
    friends: req.body.friends,
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

async function getUserByEmail(req, res) {
  // #swagger.tags = ['Members']
  //  #swagger.summary = 'Fecth on member detail'
  /* #swagger.parameters['id'] = { in: 'path', description: 'ID of member' } */
  try {
    //console.log(req)
    console.log(`Try to get member from email : ${req.params.email}`);
    const memberData = await fetchUserWithEmail(req.params.email);
    /* #swagger.responses[201] = {
            schema: { $ref: "#/definitions/Members" },
            description: 'Member detail'
        } */
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
