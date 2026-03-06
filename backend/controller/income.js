// const IncomeModel = require("../models/income");
// const { computeBudgetSummary } = require("./budget");

// async function income(req, res) {
//   try {
//     const { user_id, amount, date, category, description } = req.body;
//     if (!user_id) return res.status(400).json({ message: "User ID missing" });
//     // create
//     const newIncome = await IncomeModel.create({ user_id, amount, date, category, description });

//     // compute month/year from provided date or now
//     const d = date ? new Date(date) : new Date();
//     const year = d.getFullYear();
//     const month = d.getMonth() + 1;

//     // return updated budget summary
//     const { summary } = await computeBudgetSummary(user_id, year, month);

//     res.status(201).json({ message: "Income added", income: newIncome, summary });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// }

// async function displayincome(req, res) {
//   try {
//     const { user_id } = req.query;
//     let incomes;

//     if (user_id) {
//       incomes = await IncomeModel.find({ user_id }).sort({ date: -1 }).limit(3);
//     }

//     res.status(200).json(incomes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch incomes" });
//   }
// }

// module.exports = { income, displayincome };




const Income = require("../models/income");

// ✅ Add income
async function income(req, res) {
  try {
    // const { amount, date, user_id } = req.body;
    const { amount, date, user_id, category, description } = req.body;

    if (!amount || !date || !user_id || !category) {
      return res.status(400).json({
        success: false,
        message: "Amount, date and user_id are required",
      });
    }

    const newIncome = new Income({
      amount: Number(amount),
      date,
      user_id,
      category,
      description,
    });

    await newIncome.save();

    return res.status(201).json({
      success: true,
      message: "Income added successfully",
      data: newIncome,
    });
  } catch (err) {
    console.error("Add income error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while adding income",
    });
  }
}

// ✅ Display income
async function displayincome(req, res) {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id is required",
      });
    }

    const incomes = await Income.find({ user_id });

    const total = incomes.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    return res.status(200).json({
      success: true,
      total,
      incomes,
    });
  } catch (err) {
    console.error("Display income error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching income",
    });
  }
}

module.exports = {
  income,
  displayincome,
};