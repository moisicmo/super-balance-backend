const { response } = require('express');
const { OrderSchema, OutputSchema, KardexProductSchema, UserSchema, WarehouseSchema, InputSchema } = require('../../models');
const generateDocument = require('./../document');
const getOrders = async (req, res = response) => {

  try {
    const orders = await OrderSchema.find({ stateSold: false, state: true })
      .populate('userId', 'name')
      .populate('customerId')
      .populate('warehouseId')
      .populate({
        path: 'outputIds',
        populate: {
          path: 'productStatusId',
          populate: {
            path: 'productId',
            populate: [
              {
                path: 'categoryId',
                select: 'name'
              },
              {
                path: 'unitMeasurementId',
                select: 'name'
              }
            ]
          },
        }
      })
    res.json({
      ok: true,
      orders
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}
const getOrdersSold = async (req, res = response) => {

  try {
    const orders = await OrderSchema.find({ stateSold: true })
      .populate('userId', 'name')
      .populate('customerId')
      .populate('warehouseId')
      .populate({
        path: 'outputIds',
        populate: {
          path: 'productStatusId',
          populate: {
            path: 'productId',
            populate: [
              {
                path: 'categoryId',
                select: 'name'
              },
              {
                path: 'unitMeasurementId',
                select: 'name'
              }
            ]
          },
        }
      })
    res.json({
      ok: true,
      orders
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}

const getDocument = async (req, res = response) => {
  try {
    const order = await OrderSchema.findById(req.params.id)
      .populate('userId', 'name lastName')
      .populate('customerId')
      .populate('warehouseId')
      .populate({
        path: 'outputIds',
        populate: {
          path: 'productStatusId',
          populate: {
            path: 'productId',
            populate: [
              {
                path: 'categoryId',
                select: 'name'
              },
              {
                path: 'unitMeasurementId',
                select: 'name'
              }
            ]
          },
        }
      })
    console.log(order)
    const { pdfBase64 } = await generateDocument(order);
    res.json({
      document: pdfBase64
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}
const createOrder = async (req, res = response) => {
  const { warehouseId, customerId, outputIds } = req.body;
  try {
    const promises = outputIds.map(async (item) => {
      const output = new OutputSchema({
        ...item,
        userId: req.uid,
        productStatusId: item.productStatusId.id,
        warehouseId: item.warehouseId.id,
      });

      // obtener el último registro en el kardex
      const kardex = await KardexProductSchema.findOne({
        productStatusId: item.productStatusId.id,
        warehouseId,
      }).sort({ createdAt: -1 });

      if (!kardex) {
        return Promise.reject('Es imposible hacer el registro porque no existen ingresos de stock');
      }

      if (kardex.stock < item.productStatusId.quantity) {
        return Promise.reject('El stock es inferior a la cantidad que requiere disminuir');
      }

      // output.productStatusId = item.productStatus.id;

      console.log(output)

      // output.quantity = item.productStatus.quantity;

      const outputSave = await output.save();

      // Registro en el kardex
      const newKardex = new KardexProductSchema({
        productStatusId: item.productStatusId.id,
        inputOrOutput: outputSave.id,
        modelRef: 'Outputs',
        warehouseId,
        detail: 'orden',
        stock: kardex.stock - output.quantity
      });

      await newKardex.save();
      return newKardex;
    });

    // Espera a que todas las promesas se resuelvan antes de continuar
    Promise.all(promises)
      .then(async (results) => {
        const total = outputIds.reduce((sum, element) => sum + (element.quantity * element.price), 0);
        const order = await OrderSchema({
          userId: req.uid,
          customerId: customerId.id,
          warehouseId,
          outputIds: results.map(e => e.inputOrOutput),
          total
        });
        await order.save();
        const warehouse = await WarehouseSchema.findById(warehouseId)
        const user = await UserSchema.findById(req.uid)
        console.log(warehouse)
        const getOrder = await OrderSchema.findById(order.id)
          .populate('userId', 'name lastName')
          .populate('customerId')
          .populate('warehouseId')
          .populate({
            path: 'outputIds',
            populate: {
              path: 'productStatusId',
              populate: {
                path: 'productId',
                populate: [
                  {
                    path: 'categoryId',
                    select: 'name'
                  },
                  {
                    path: 'unitMeasurementId',
                    select: 'name'
                  }
                ]
              },
            }
          })
        const { pdfBase64 } = await generateDocument(getOrder);
        res.json({
          document: pdfBase64,
          order: getOrder
        });
      })
      .catch((error) => {
        console.log(error)
        // Maneja errores si alguna de las promesas falla
        return res.status(500).json({
          ok: false,
          msg: 'Error en la generación de salidas',
          error: error.message
        });
      });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};
const updateOrder = async (req, res = response) => {
  console.log('EDITANDO')
  const { warehouseId, customerId, outputIds } = req.body;
  try {
    const order = await OrderSchema.findById(req.params.id)
      .populate('userId', 'name lastName')
      .populate('customerId')
      .populate('warehouseId')
      .populate({
        path: 'outputIds',
        populate: {
          path: 'productStatusId',
          populate: {
            path: 'productId',
            populate: [
              {
                path: 'categoryId',
                select: 'name'
              },
              {
                path: 'unitMeasurementId',
                select: 'name'
              }
            ]
          },
        }
      });
    const elementosFaltantes = order.outputIds.map(e => e.id).filter(item => !outputIds.map(e => e.id).includes(item))
    elementosFaltantes.forEach(async (element) => {
      const kardex = await KardexProductSchema.find({ inputOrOutput: element })
      await OutputSchema.findByIdAndDelete(element);
      await KardexProductSchema.findByIdAndDelete(kardex[0].id);
      await OrderSchema.findByIdAndUpdate(order.id, { outputIds: [...order.outputIds.map(e => e.id).filter(e => e != element)] }, { new: true });
    })

    const promises = outputIds.map(async (element) => {
      const kardex = await KardexProductSchema.find({ inputOrOutput: element.id })
      if (order.outputIds.map(e => e.productStatusId.id).includes(element.productStatusId.id)) {
        console.log('encontrado', element.productStatusId.id)
        if (element.quantity !== order.outputIds.find(e => e.id == element.id).quantity) {
          const diference = element.quantity - order.outputIds.find(e => e.id == element.id).quantity;
          await OutputSchema.findByIdAndUpdate(element.id, { quantity: element.quantity }, { new: true });
          await KardexProductSchema.findByIdAndUpdate(kardex[0].id, { stock: kardex[0].stock - diference }, { new: true });
        }
      } else {
        console.log('no encontrado', element.productStatusId.id)
        // obtener el último registro en el kardex
        const kardex = await KardexProductSchema.findOne({
          productStatusId: element.productStatusId.id,
          warehouseId,
        }).sort({ createdAt: -1 });

        const output = new OutputSchema({
          ...element,
          userId: req.uid,
          productStatusId: element.productStatusId.id,
          warehouseId: element.warehouseId.id,
        });
        const outputSave = await output.save();
        // Registro en el kardex
        const newKardex = new KardexProductSchema({
          productStatusId: element.productStatusId.id,
          inputOrOutput: outputSave.id,
          modelRef: 'Outputs',
          warehouseId,
          detail: 'orden',
          stock: kardex.stock - output.quantity
        });

        await newKardex.save();
        console.log([...order.outputIds.map(e => e.id), output.id])
        await OrderSchema.findByIdAndUpdate(order.id, { outputIds: [...order.outputIds.map(e => e.id), output.id] }, { new: true });
      }
    });
    Promise.all(promises)
      .then(async (results) => {
        console.log('HECHO')
        const newOrder = await OrderSchema.findById(req.params.id)
          .populate('userId', 'name lastName')
          .populate('customerId')
          .populate('warehouseId')
          .populate({
            path: 'outputIds',
            populate: {
              path: 'productStatusId',
              populate: {
                path: 'productId',
                populate: [
                  {
                    path: 'categoryId',
                    select: 'name'
                  },
                  {
                    path: 'unitMeasurementId',
                    select: 'name'
                  }
                ]
              },
            }
          });
        await OrderSchema.findByIdAndUpdate(order.id, {
          customerId: customerId.id,
          total: newOrder.outputIds.reduce((sum, element) => sum + (element.quantity * element.price), 0)
        })
        const orderWithRef = await OrderSchema.findById(req.params.id)
          .populate('userId', 'name lastName')
          .populate('customerId')
          .populate('warehouseId')
          .populate({
            path: 'outputIds',
            populate: {
              path: 'productStatusId',
              populate: {
                path: 'productId',
                populate: [
                  {
                    path: 'categoryId',
                    select: 'name'
                  },
                  {
                    path: 'unitMeasurementId',
                    select: 'name'
                  }
                ]
              },
            }
          });
        const { pdfBase64 } = await generateDocument(orderWithRef);
        res.json({
          document: pdfBase64,
          order: orderWithRef
        });
      }).catch((error) => {
        console.log(error)
        // Maneja errores si alguna de las promesas falla
        return res.status(500).json({
          ok: false,
          msg: 'Error en la generación de salidas',
          error: error.message
        });
      });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}
const updateOrderSold = async (req, res = response) => {
  try {
    const order = await OrderSchema.findById(req.params.id)
      .populate('userId', 'name lastName')
      .populate('customerId')
      .populate('warehouseId')
      .populate({
        path: 'outputIds',
        populate: {
          path: 'productStatusId',
          populate: {
            path: 'productId',
            populate: [
              {
                path: 'categoryId',
                select: 'name'
              },
              {
                path: 'unitMeasurementId',
                select: 'name'
              }
            ]
          },
        }
      });
    const newOrder = await OrderSchema.findByIdAndUpdate(req.params.id, { stateSold: true }, { new: true });
    const orderWithRef = await OrderSchema.findById(newOrder.id)
      .populate('userId', 'name lastName')
      .populate('customerId')
      .populate('warehouseId')
      .populate({
        path: 'outputIds',
        populate: {
          path: 'productStatusId',
          populate: {
            path: 'productId',
            populate: [
              {
                path: 'categoryId',
                select: 'name'
              },
              {
                path: 'unitMeasurementId',
                select: 'name'
              }
            ]
          },
        }
      });
    const { pdfBase64 } = await generateDocument(orderWithRef);
    res.json({
      ok: true,
      document: pdfBase64
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}
const deleteOrder = async (req, res = response) => {
  try {
    const order = await OrderSchema.findById(req.params.id)
      .populate('userId', 'name lastName')
      .populate('customerId')
      .populate('warehouseId')
      .populate({
        path: 'outputIds',
        populate: {
          path: 'productStatusId',
          populate: {
            path: 'productId',
            populate: [
              {
                path: 'categoryId',
                select: 'name'
              },
              {
                path: 'unitMeasurementId',
                select: 'name'
              }
            ]
          },
        }
      })
    const promises = order.outputIds.map(async (item) => {
      const input = new InputSchema({
        productStatusId: item.productStatusId.id,
        userId: req.uid,
        warehouseId: item.warehouseId,
        quantity: item.quantity,
        price: item.price,
      });
      const inputSave = await input.save();
      const kardex = await KardexProductSchema.findOne({
        productStatusId: input.productStatusId,
        warehouseId: input.warehouseId,
      }).sort({ createdAt: -1 });
      const newKardex = new KardexProductSchema({
        productStatusId: input.productStatusId,
        inputOrOutput: inputSave.id,
        modelRef: 'Inputs',
        warehouseId: input.warehouseId,
        detail: 'reposiciön de una orden',
        stock: kardex ? (kardex.stock + input.quantity) : input.quantity
      });
      await newKardex.save();
    })
    Promise.all(promises)
      .then(async () => {

        const newOrder = {
          state: false
        }

        await OrderSchema.findByIdAndUpdate(req.params.id, newOrder, { new: true });
        res.json({
          ok: true,
        })
      })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}

module.exports = {
  getOrders,
  getOrdersSold,
  getDocument,
  createOrder,
  updateOrder,
  updateOrderSold,
  deleteOrder,
}