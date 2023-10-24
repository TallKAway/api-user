const { createUser,fetchAllUser,updateUser,deleteUser } = require('../repository/UserRepository');
const ResponseMessage = require('../constants/ResponseMessage');


async function AddUser(req, res) { 

    const userData = {
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        phone: req.body.phone,
        
        service: req.body.service,
        friends: req.body.friends,
    };
    try {
        console.log('Create user');
        const user = await createUser(userData);
        console.log('user created');
        res.status(201).json({
            status: ResponseMessage.MSG_311,
            message: 'User created successfully',
            data: user,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


async function UpdateUser(req, res) { 
    
        const userData = {
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
            phone: req.body.phone,
        };
        try {
            console.log('Update user');
            const user = await updateUser(userData);
            console.log('user updated');
            res.status(201).json({
                status: ResponseMessage.MSG_312,
                message: 'User updated successfully',
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
            message: 'User fetched successfully',
            data: userData,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function DeleteUser(req, res) { 
try {
    const user = await req.payload;

    const userData = await deleteUser(user);
    res.status(200).json({
        status: ResponseMessage.MSG_313,
        message: 'User deleted successfully',
        data: userData,
    });
} catch (error) {
    res.status(400).json({ error: error.message });
}
}

module.exports = {
    AddUser,
    UpdateUser,
    FetchUser,
    DeleteUser
}


