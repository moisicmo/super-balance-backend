//module users
const UserSchema = require('./module.user/user.model');
const TypeUserSchema = require('./module.user/type.user.model');
const RoleSchema = require('./module.user/rol.model');
const PermisionSchema = require('./module.user/permision.model');
//module warehouses
const WarehouseSchema = require('./module.warehouse/warehouse.model');
const CategorySchema = require('./module.warehouse/category.model');
const UnitMeasurementSchema = require('./module.warehouse/unit.measurement.model');
const ProductSchema = require('./module.warehouse/product.model');
const ProductStatusSchema = require('./module.warehouse/product.status.model');
const PriceSchema = require('./module.warehouse/price.model');
const OutputSchema = require('./module.warehouse/output.model');
const InputSchema = require('./module.warehouse/input.model');
const KardexProductSchema = require('./module.warehouse/kardex.product.model');
module.exports = {
    //module users
    UserSchema,
    TypeUserSchema,
    RoleSchema,
    PermisionSchema,
    //module warehouses
    WarehouseSchema,
    CategorySchema,
    UnitMeasurementSchema,
    ProductSchema,
    ProductStatusSchema,
    PriceSchema,
    OutputSchema,
    InputSchema,
    KardexProductSchema,
    //
}