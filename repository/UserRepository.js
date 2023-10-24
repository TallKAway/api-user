const {prisma} = require('../utils/database');


function createUser(userData) {
    return prisma.userData.create({
        data: {
            pseudo: userData.pseudo,
            email: userData.email,
            password: userData.password,
            avatar: userData.avatar,
            phone: userData.phone,
            service: userData.service,
            refreshToken: userData.refreshToken,
            friends: userData.friends,
        },
    })
}



function fetchAllUser(user) {
    return prisma.userData.findMany({
        where: {
            user_id: user.user_id,
            deleted_at: null
        },
        
        
    });
}



function deleteUser(user) {
    return prisma.userData.findMany({
        where: {
            user_id: user.user_id,
        },
        
    });
}

exports.createUser = {createUser, fetchAllUser, deleteUser};
