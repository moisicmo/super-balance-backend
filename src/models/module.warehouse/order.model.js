const { Schema, model } = require('mongoose');

const OrderSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customers',
      required: true
    },
    warehouseId: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouses',
      required: true
    },
    outputIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Outputs',
        required: true
      }
    ],
    total: {
      type: Number,
      required: [true, 'El precio es obligatorio']
    },
    discount: {
      type: Number,
      default: 0.00
    },
    typeDiscount: {
      type: String,
      default: 'Monto',
      enum: ['Monto', 'Porcentaje']
    },
    state: {
      type: Boolean,
      default: true
    },
    stateSold: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true });
OrderSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  console.log(object)
  if (object.userId) {
    object.userId.id = object.userId._id
    delete object.userId._id;
    delete object.userId.__v;
  }
  if (object.customerId) {
    object.customerId.id = object.customerId._id
    delete object.customerId._id;
    delete object.customerId.__v;
  }
  if (object.warehouseId) {
    object.warehouseId.id = object.warehouseId._id
    delete object.warehouseId._id;
    delete object.warehouseId.__v;
  }
  if (object.outputIds) {
    object.outputIds.forEach(e => {
      e.id = e._id;
      delete e._id;
      delete e.__v;
      if (e.productStatusId) {
        e.productStatusId.id = e.productStatusId._id;
        delete e.productStatusId._id;
        delete e.productStatusId.__v;
        if (e.productStatusId.productId) {
          e.productStatusId.productId.id = e.productStatusId.productId._id;
          delete e.productStatusId.productId._id;
          delete e.productStatusId.productId.__v;
          if (e.productStatusId.productId.categoryId) {
            e.productStatusId.productId.categoryId.id = e.productStatusId.productId.categoryId._id;
            delete e.productStatusId.productId.categoryId._id;
          }
          if (e.productStatusId.productId.unitMeasurementId) {
            e.productStatusId.productId.unitMeasurementId.id = e.productStatusId.productId.unitMeasurementId._id;
            delete e.productStatusId.productId.unitMeasurementId._id;
          }
        }
      }
    });
  }
  return object;
});


module.exports = model('Orders', OrderSchema);
