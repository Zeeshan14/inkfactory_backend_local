const RoleModel = require("../api/user/models/RoleModel");
const { User } = require("../models");
const Status = require("../models/status.model");
const bcrypt = require("bcrypt");

const seedRoles = async () => {
  await RoleModel.bulkCreate([
    {
      role: "admin",
    },
    {
      role: "user",
    },
    {
      role: "artist",
    },
  ]);
};
const seedStatus = async () => {
  await Status.bulkCreate([
    {
      slug: "pending",
      status: "Pending",
    },
    {
      slug: "pending",
      status: "Pending",
    },
    {
      slug: "payment-pending",
      status: "Payment Pending",
    },
    {
      slug: "on-hold",
      status: "On Hold",
    },
    {
      slug: "completed",
      status: "Completed",
    },
    {
      slug: "cancelled",
      status: "Cancelled",
    },
    {
      slug: "refunded",
      status: "Refunded",
    },
    {
      slug: "failed",
      status: "Failed",
    },
    {
      slug: "new-quote-request",
      status: "New Quote Request",
    },
    {
      slug: "pending-quote",
      status: "Pending Quote",
    },
    {
      slug: "expired-quote",
      status: "Expired Quote",
    },
    {
      slug: "accepted-quote",
      status: "Accepted Quote",
    },
    {
        slug: "rejected-quote",
      status: "Rejected Quote",
    },
    {
      slug: "ready-for-shipment",
      status: "Ready for Shipment",
    },
    {
      slug: "transaction-timeout",
      status: "Transaction Timeout",
    },
    {
      slug: "payment-pending-shipment",
      status: "Payment Pending Shipment",
    },
    {
      slug: "otc-voucher-failure",
      status: "OTC/Voucher Failure",
    },
    {
      slug: "draft",
      status: "Draft",
    },
    {
      slug: "processing",
      status: "Processing",
    },
  ]);
};
const createAdmin = async()=>{
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync("Lahore*147", salt);
  await User.create({
    first_name:"Ahsan",
    last_name:"mughal",
    email:"ahsanmughal@gmail.com",
    username:"Ahsan_Mughal",
    password:hashedPassword,
    role_id:1,
  })
}
const seedDb = async () => {
  try {
    await seedRoles()
    await seedStatus()
    await createAdmin()
  } catch (err) {
    console.log(err);
    console.log("Error Seeding Db");
  }
};
seedDb();
