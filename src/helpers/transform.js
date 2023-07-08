const transformUserWarehouses = (user) => {
    const transformedUser = { ...user };
    transformedUser.id = transformedUser._id;
    delete transformedUser._id;
    delete transformedUser.__v;
    if (transformedUser.roleId) {
        const { __v, _id, ...roleId } = transformedUser.roleId;

        const updatedPermissionIds = roleId.permisionIds.map((permission) => {
            const { __v, _id, ...permissionData } = permission;
            return {
                id: _id,
                ...permissionData,
            };
        });

        transformedUser.roleId = {
            id: _id,
            ...roleId,
            permisionIds: updatedPermissionIds,
        };
    }
    if (transformedUser.typeUserId) {
        const { _id, ...typeUserId } = transformedUser.typeUserId;
        transformedUser.typeUserId = {
            id: _id,
            ...typeUserId,
        };
    }
    if (transformedUser.responsibleId) {
        const { _id, ...responsibleId } = transformedUser.responsibleId;
        transformedUser.responsibleId = {
            id: _id,
            ...responsibleId,
        };
    }

    return transformedUser;
};
const transformProductStatus = (product) => {
    const transformedProduct = { ...product };
    transformedProduct.id = transformedProduct._id;
    delete transformedProduct._id;
    delete transformedProduct.__v;
    if (transformedProduct.userId) {
        const { _id, ...userId } = transformedProduct.userId;
        transformedProduct.userId = {
            id: _id,
            ...userId,
        };
    }
    if (transformedProduct.categoryId) {
        const { _id, ...categoryId } = transformedProduct.categoryId;
        transformedProduct.categoryId = {
            id: _id,
            ...categoryId,
        };
    }
    if (transformedProduct.unitMeasurementId) {
        const { _id, ...unitMeasurementId } = transformedProduct.unitMeasurementId;
        transformedProduct.unitMeasurementId = {
            id: _id,
            ...unitMeasurementId,
        };
    }

    return transformedProduct;
};
module.exports = {
    transformUserWarehouses,
    transformProductStatus
}