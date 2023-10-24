const { prisma } = require("../utils/database");

function createUser(userData) {
  return prisma.user.create({
    data: userData,
  });
}

function fetchAllUser(user) {
  return prisma.userData.findMany({
    where: {
      user_id: user.user_id,
      deleted_at: null,
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
module.exports = { createUser, fetchAllUser, deleteUser, fetchUserWithEmail };
