const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('./module.user/user.controller');
const {
    getTypeUsers,
    createTypeUser,
    updateTypeUser,
    deleteTypeUser,
} = require('./module.user/type.user.controller');
const {
    getRoles,
    createRol,
    updateRol,
    deleteRol,
} = require('./module.user/role.controller');
const {
    getPermisions,
    createPermision,
} = require('./module.user/permision.controller');
const {
    getWarehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse
} = require('./module.warehouse/warehouse.controller');
module.exports = {
    //module users
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getTypeUsers,
    createTypeUser,
    updateTypeUser,
    deleteTypeUser,
    getRoles,
    createRol,
    updateRol,
    deleteRol,
    getPermisions,
    createPermision,
    //module warehouses
    getWarehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse
}