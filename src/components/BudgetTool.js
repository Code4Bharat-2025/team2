// BudgetTool.js
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function calculateInvestment(principal, rate, years, type, frequency, isSIP) {
  const result = [];
  let amount = principal;
  const periods = frequency === "half" ? years * 2 : years;
  const interestRate = rate / 100 / (frequency === "half" ? 2 : 1);

  for (let i = 0; i <= periods; i++) {
    result.push({ year: (i / (frequency === "half" ? 2 : 1)).toFixed(1), amount: amount });
    if (isSIP) {
      amount = amount * (1 + interestRate) + principal;
    } else {
      amount = amount * (1 + interestRate);
    }
  }
  return result;
}

function BudgetTool() {
  const [income, setIncome] = useState(0);
  const [housing, setHousing] = useState(0);
  const [food, setFood] = useState(0);
  const [transport, setTransport] = useState(0);
  const [entertainment, setEntertainment] = useState(0);

  const [invPrincipal, setInvPrincipal] = useState(0);
  const [invRate, setInvRate] = useState(7);
  const [invYears, setInvYears] = useState(5);
  const [invFreq, setInvFreq] = useState("annual");
  const [invType, setInvType] = useState("sip");

  const totalExpenses = housing + food + transport + entertainment;
  const savings = income - totalExpenses;

  const chartData = calculateInvestment(
    invPrincipal,
    invRate,
    invYears,
    invType,
    invFreq === "half" ? "half" : "annual",
    invType === "sip"
  );

  return (
    <div className="min-h-screen bg-base-100 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Budget Calculator */}
      <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-primary mb-4">💸 Budget Calculator</h2>
        <div>
          <label className="block font-semibold mb-1">Monthly Income (₹)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Housing</label>
            <input type="number" className="input input-bordered w-full" value={housing} onChange={(e) => setHousing(Number(e.target.value))} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Food</label>
            <input type="number" className="input input-bordered w-full" value={food} onChange={(e) => setFood(Number(e.target.value))} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Transport</label>
            <input type="number" className="input input-bordered w-full" value={transport} onChange={(e) => setTransport(Number(e.target.value))} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Entertainment</label>
            <input type="number" className="input input-bordered w-full" value={entertainment} onChange={(e) => setEntertainment(Number(e.target.value))} />
          </div>
        </div>
        <div className="mt-4 p-4 rounded-lg text-lg bg-base-200 shadow-inner">
          <p className="mb-2 font-medium">💸 Total Expenses: ₹ {totalExpenses}</p>
          <p className={savings >= 0 ? "text-green-600" : "text-red-600 font-semibold"}>
            {savings >= 0 ? `✅ You're saving ₹${savings} this month!` : `⚠️ Overspending by ₹${-savings}`}
          </p>
        </div>
      </div>

      {/* Investment Calculator */}
      <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">📈 Investment Calculator</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Principal / Monthly Investment (₹)</label>
            <input type="number" className="input input-bordered w-full" value={invPrincipal} onChange={(e) => setInvPrincipal(Number(e.target.value))} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Annual Interest Rate (%)</label>
            <input type="number" className="input input-bordered w-full" value={invRate} onChange={(e) => setInvRate(Number(e.target.value))} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Investment Duration (Years)</label>
            <input type="number" className="input input-bordered w-full" value={invYears} onChange={(e) => setInvYears(Number(e.target.value))} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Compound Frequency</label>
            <select className="select select-bordered w-full" value={invFreq} onChange={(e) => setInvFreq(e.target.value)}>
              <option value="annual">Annually</option>
              <option value="half">Half-Yearly</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block font-semibold mb-1">Investment Type</label>
            <div className="flex space-x-4">
              <label><input type="radio" name="type" value="sip" checked={invType === "sip"} onChange={() => setInvType("sip")} className="mr-1" /> SIP</label>
              <label><input type="radio" name="type" value="lump" checked={invType === "lump"} onChange={() => setInvType("lump")} className="mr-1" /> Lump Sum</label>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BudgetTool;
