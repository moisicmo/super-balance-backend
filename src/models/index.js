//module users
const UserSchema = require('./module.user/user.model');
const TypeUserSchema = require('./module.user/type.user.model');
const RoleSchema = require('./module.user/role.model');
const PermisionSchema = require('./module.user/permision.model');
//module warehouses
const WarehouseSchema = require('./module.warehouse/warehouse.model');
const CategorySchema = require('./module.warehouse/category.model');
const UnitMeasurementSchema = require('./module.warehouse/unit.measurement.model');
const ProductSchema = require('./module.warehouse/product.model');
const ProductStatusSchema = require('./module.warehouse/product.status.model');
const OutputSchema = require('./module.warehouse/output.model');
const InputSchema = require('./module.warehouse/input.model');
const KardexProductSchema = require('./module.warehouse/kardex.product.model');
//module customers
const TypeDocumentsSchema = require('./module.customer/type.document.model');
const CustomerSchema = require('./module.customer/customer.model');
//module orders
const OrderSchema = require('./module.warehouse/order.model');
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
    OutputSchema,
    InputSchema,
    KardexProductSchema,
    //module customers
    TypeDocumentsSchema,
    CustomerSchema,
    //module orders
    OrderSchema,

}