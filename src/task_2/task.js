const express = require('express');
const app = express();
const port = 3000;
const Joi = require('@hapi/joi');
const validate = require('express-joi-validate');

const userIdSchema = Joi.string().required();
const userSchema = {
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().regex(/(?=.*[0-9])(?=.*[A-Za-z])/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
};
const AutoSuggestUserSchema = {
    loginSubstring: Joi.string().required(),
    limit: Joi.number().integer()
};
const validateSchemas = {
    getUserById: {
        params: {
            id: userIdSchema
        }
    },
    createUser: {
        body: userSchema
    },
    updateUser: {
        body: userSchema
    },
    deleteUser: {
        params: {
            id: userIdSchema
        }
    },
    getAutoSuggestUsers: {
        body: AutoSuggestUserSchema
    }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let userList = [];
userList.push({
    id       : '1',
    login    : 'logged in',
    password : 'test@123',
    age      : 12,
    isDeleted: false
});

// get user by id
const getUserById = (userId) => {
    return userList.find(user => user && user.id === userId);
};

// remove user
const removeUser = (newUser) => {
    if (!newUser) {
        return;
    }

    const userIndex = userList.findIndex(user => user && user.id === newUser.id);

    if (userIndex < 0) {
        return;
    }

    userList = userList
        .slice(0, userIndex)
        .concat(userList.slice(userIndex + 1, userList.length));
};

// remove user
const deleteUser = (user) => {
    if (!user) {
        return;
    }

    const deletedUser = userList.find(item => item && item.id === user.id);

    if (!deletedUser) {
        return;
    }

    deletedUser.isDeleted = true;
};

// create/update user
const updateUser = (newUser) => {
    removeUser(newUser);
    userList.push(newUser);
};

// get auto-suggest list from limit users, sorted by login property and filtered by
const getAutoSuggestUsers = (loginSubstring, limit) => {
    const suggestedUsers = [];

    userList.forEach(user => {
        if (user && user.login.indexOf(loginSubstring) > -1) {
            suggestedUsers.push(user);
        }
    });

    suggestedUsers.sort((a, b) => {
        return a.login - b.login;
    });

    return limit <= 0 ? suggestedUsers : suggestedUsers.slice(0, limit);
};

app.get('/getUser/:id', validate(validateSchemas.getUserById), (req, res) => {
    const userId = req.params.id;
    const user = getUserById(userId);

    res.json(user ? user : {
        'error': 'no such user'
    });
});

app.post('/createUser', validate(validateSchemas.createUser), (req, res) => {
    const newUser = req.body;

    updateUser(newUser);

    res.json(newUser);
});

app.put('/updateUser', validate(validateSchemas.updateUser), (req, res) => {
    const newUser = req.body;

    updateUser(newUser);

    res.json(newUser);
});

app.delete('/deleteUser/:id', validate(validateSchemas.deleteUser), (req, res) => {
    const user = {
        id: req.params.id
    };

    deleteUser(user);

    res.json(user);
});

app.post('/getAutoSuggestUsers', validate(validateSchemas.getAutoSuggestUsers), (req, res) => {
    const body = req.body;
    const {
        loginSubstring,
        limit
    } = body;

    const users = getAutoSuggestUsers(loginSubstring, limit);

    res.json(users);
});

// 404
app.use((req, res) => {
    res.status(404);
    res.send(`404 <br /> ${req.method} ${req.originalUrl}`);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error('there is an error', err);

    res.status(400);
    res.json(err && err.details);
});

app.listen(port, () => {
    console.log(`Service started, listening at http://localhost:${port}`);
});
