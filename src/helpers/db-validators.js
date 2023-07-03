const mongoose = require('mongoose');

const {
  TypeUserSchema,
  RoleSchema,
  PermisionSchema,
  UserSchema,
  WarehouseSchema,
  UnitMeasurementSchema,
  CategorySchema,
  ProductSchema,
  ProductStatusSchema,
} = require('../models');
const ObjectId = mongoose.Types.ObjectId;

const typeUserExists = async (name = "", data = "") => {
  // Verificar si el tipo de usuario existe
  const objIdToExclude = new ObjectId(data.req.params.id);

  let existTypeUser = await TypeUserSchema.findOne({
    name: name,
    _id: { $ne: objIdToExclude ?? null },
    state: true
  });

  if (existTypeUser) {
    throw new Error(`El nombre: ${name}, ya está registrado`);
  }
};

const roleExists = async (name = "", data = "") => {
  // Verificar si el tipo de usuario existe
  const objIdToExclude = new ObjectId(data.req.params.id);

  let existRol = await RoleSchema.findOne({
    name: name,
    _id: { $ne: objIdToExclude ?? null },
    state: true
  });

  if (existRol) {
    throw new Error(`El nombre: ${name}, ya está registrado`);
  }
};

const permisionExists = async (name = "", data = "") => {
  // Verificar si el tipo de usuario existe
  const objIdToExclude = new ObjectId(data.req.params.id);

  let existRol = await PermisionSchema.findOne({
    name: name,
    _id: { $ne: objIdToExclude ?? null },
    state: true
  });

  if (existRol) {
    throw new Error(`El nombre: ${name}, ya está registrado`);
  }
};
const emailExists = async (email = "", data = "") => {
  // Verificar si el tipo de usuario existe
  const objIdToExclude = new ObjectId(data.req.params.id);

  let existRol = await UserSchema.findOne({
    email: email,
    _id: { $ne: objIdToExclude ?? null },
    state: true
  });

  if (existRol) {
    throw new Error(`El nombre: ${email}, ya está registrado`);
  }
};
const categoryExists = async (name = "", data = "") => {
  // Verificar si el tipo de usuario existe
  const objIdToExclude = new ObjectId(data.req.params.id);

  let existCategory = await CategorySchema.findOne({
    name: name,
    _id: { $ne: objIdToExclude ?? null },
    state: true
  });

  if (existCategory) {
    throw new Error(`El titulo: ${name}, ya está registrado`);
  }
};
const warehouseExists = async (name = "", data = "") => {
  // Verificar si la sucursal existe
  const objIdToExclude = new ObjectId(data.req.params.id);

  let existWarehouse = await WarehouseSchema.findOne({
    name: name,
    _id: { $ne: objIdToExclude ?? null },
    state: true
  });

  if (existWarehouse) {
    throw new Error(`El titulo: ${name}, ya está registrado`);
  }
};
const unitMEasurementExists = async (name = "", data = "") => {
  // Verificar si la sucursal existe
  const objIdToExclude = new ObjectId(data.req.params.id);

  let existUnitMeasurement = await UnitMeasurementSchema.findOne({
    name: name,
    _id: { $ne: objIdToExclude ?? null },
    state: true
  });

  if (existUnitMeasurement) {
    throw new Error(`El titulo: ${name}, ya está registrado`);
  }
};
const productExists = async (name = "", data = "") => {
  // Verificar si la sucursal existe
  const objIdToExclude = new ObjectId(data.req.params.id);

  let existProduct = await ProductSchema.findOne({
    name: name,
    _id: { $ne: objIdToExclude ?? null },
    state: true
  });

  if (existProduct) {
    throw new Error(`El titulo: ${name}, ya está registrado`);
  }
};
const productStatusExists = async (name = "", data = "") => {
  // Verificar si la sucursal existe
  const objIdToExclude = new ObjectId(data.req.params.id);

  let existProductStatus = await ProductStatusSchema.findOne({
    name: name,
    _id: { $ne: objIdToExclude ?? null },
    state: true
  });

  if (existProductStatus) {
    throw new Error(`El titulo: ${name}, ya está registrado`);
  }
};
module.exports = {
  typeUserExists,
  roleExists,
  permisionExists,
  emailExists,
  categoryExists,
  warehouseExists,
  unitMEasurementExists,
  productExists,
  productStatusExists,
};
