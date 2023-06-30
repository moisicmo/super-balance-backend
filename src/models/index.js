//module users
const UserSchema = require('./module.user/user.model');
const TypeUserSchema = require('./module.user/type.user.model');
const RoleSchema = require('./module.user/rol.model');
const PermisionSchema = require('./module.user/permision.model');
//module warehouses
const WarehouseSchema = require('./module.warehouse/warehouse.model');

module.exports = {
    //module users
    UserSchema,
    TypeUserSchema,
    RoleSchema,
    PermisionSchema,
    //module warehouses
    WarehouseSchema,

}