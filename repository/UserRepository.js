const { prisma } = require("../utils/database");
const axios = require("axios");

const dotenv = require('dotenv');
AUTH_API_URL= process.env.TALLKAWAY_AUTH_API_URL

function createUser(userData) {
  return prisma.user.create({
    data: userData,
  });
}

function fetchAllUser(user) {
  return prisma.user.findMany({
    where: {
        id: user.id,
    },
  });
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



async function register(email, password) {

    try {
        const response =  await axios.get(AUTH_API_URL + 'auth/get/token' + email + password, { timeout: 50000 })
        return response.data.data
    }catch (error){
       
        console.log("Erreur lors de la recuperation d'un membre apres authentification")
        console.log(error)
    }

}

module.exports = { createUser, fetchAllUser, deleteUser, fetchUserWithEmail, register };
