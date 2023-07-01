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
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('./module.warehouse/categorie.controller');
const {
    getMeasurementUnits,
    createunitMeasurement,
    updateunitMeasurement,
    deleteunitMeasurement,
} = require('./module.warehouse/unit.measurement.controller');
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('./module.warehouse/product.controller');
const {
    getProductStatus,
    createProductStatus,
    updateProductStatus,
    deleteProductStatus,
} = require('./module.warehouse/product.status.controller');
const {
    getPrices,
    createPrice,
    updatePrice,
    deletePrice,
} = require('./module.warehouse/price.controller');
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
    deleteWarehouse,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getMeasurementUnits,
    createunitMeasurement,
    updateunitMeasurement,
    deleteunitMeasurement,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductStatus,
    createProductStatus,
    updateProductStatus,
    deleteProductStatus,
    getPrices,
    createPrice,
    updatePrice,
    deletePrice,
}