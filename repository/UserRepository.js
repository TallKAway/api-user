const { prisma } = require("../utils/database");
const bcrypt = require('bcrypt');
const axios = require("axios");

const dotenv = require('dotenv');
AUTH_API_URL= process.env.TALLKAWAY_AUTH_API_URL

function createUser(userData) {
  return prisma.user.create({
    data: userData,
  });
}

function exclude(user, keys) {
  return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}



async function fetchAllUser(user) {
  
  const users = await prisma.user.findMany({
    where: {
        id: user.id,
    },
    include: {
      friends: {
        select: {
          id: true,
          username: true,
          email: true,
          cellphone: true,
        }
      },
    },
  });


  // Exclude password field
  const usersWithoutPassword = users.map(user => exclude(user, ['password']));
  return usersWithoutPassword;
}

function deleteUser(user) {
  return prisma.user.delete({
    where: {
      id: user,
    },
  });
}

function fetchUserWithEmail(email) {
    return prisma.user.findFirst({
        where: {
            email: email
        },
       
    });
}


function updateUser(userData) {
     userData.password = bcrypt.hashSync(userData.password, 12);
  return prisma.user.update({
    where: {
      id: userData.id,
    },
   data: {
            username: userData.username, // Incluez les modifications que vous souhaitez apporter
            email: userData.email,
            password: userData.password,
            cellphone: userData.cellphone,
            friends: userData.friends,
        },
  });
}



async function register(email, password) {

    try {
        const response =  await axios.get(AUTH_API_URL + 'auth/get/token' + email + password, { timeout: 50000 })
        return response.data.data
    }catch (error){
       
        console.log("Erreur lors de la recuperation d'un membre apres authentification")
        console.log(error)
    }

}



async function addFriend(userId, friendId) {
  const user = await prisma.user.update({
    where: { id: userId,},
    data: {
      friends: {
        connect: friendId.map(id => ({ id })),
      },
    },
    include: {
      friends: {
        select: {
          id: true,
          username: true,
          password: false,
          email: true,
          cellphone: true,
          inverseFriends: {
            select: {
              id: true,
              username: true,
              password: false,
              email: true,
              cellphone: true,
            }
          }
        }
      },
    },
  });
// const usersWithoutPassword = ;
//   return usersWithoutPassword;

  return user;
}


function deleteFriend(userId, friendId) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      friends: {
        disconnect: friendId.map(id => ({ id })),
      },
    },
  });
}

async function fetchUserById(id) {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
  }).then(user => exclude(user, ['cellphone', 'email', 'password', 'friends']));
}

module.exports = { createUser, fetchAllUser, deleteUser, fetchUserWithEmail, register,updateUser,addFriend,deleteFriend, fetchUserById };
