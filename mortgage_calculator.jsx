import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, PieChart, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function MortgageCalculator() {
  const [salary, setSalary] = useState(23780);
  const [mortgagePayment, setMortgagePayment] = useState(12000);
  const [currency, setCurrency] = useState('SAR');
  
  // Expenses state
  const [utilities, setUtilities] = useState({
    electricity: 900,
    water: 100,
    maintenance: 600,
    internet: 450,
    mobile: 500
  });
  
  const [familyExpenses, setFamilyExpenses] = useState(3000);
  const [groceries, setGroceries] = useState(1500);
  const [deliveryApps, setDeliveryApps] = useState(1000);
  const [subscriptions, setSubscriptions] = useState(250);
  const [school, setSchool] = useState(1916.67);
  const [car, setCar] = useState({
    gas: 800,
    maintenance: 1000,
    insurance: 400
  });

  // Calculate totals
  const totalUtilities = Object.values(utilities).reduce((a, b) => a + b, 0);
  const totalCar = Object.values(car).reduce((a, b) => a + b, 0);
  const totalLivingExpenses = totalUtilities + familyExpenses + groceries + deliveryApps + subscriptions + school + totalCar;
  const totalObligations = mortgagePayment + totalLivingExpenses;
  const remaining = salary - totalObligations;
  
  // Percentages
  const mortgagePercent = (mortgagePayment / salary) * 100;
  const livingPercent = (totalLivingExpenses / salary) * 100;
  const totalPercent = (totalObligations / salary) * 100;
  const remainingPercent = (remaining / salary) * 100;
  
  // Affordability calculations
  const maxAffordable35 = salary * 0.35;
  const maxAffordable40 = salary * 0.40;
  const dti = mortgagePercent / 100;
  
  // Risk level
  const getRiskLevel = () => {
    if (dti <= 0.28) return { level: 'Safe', color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
    if (dti <= 0.35) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertCircle };
    if (dti <= 0.43) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-100', icon: AlertCircle };
    return { level: 'Very High', color: 'text-red-600', bg: 'bg-red-100', icon: XCircle };
  };
  
  const risk = getRiskLevel();
  const RiskIcon = risk.icon;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Calculator className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Mortgage Affordability Calculator</h1>
            </div>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="SAR">SAR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="AED">AED</option>
            </select>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'dashboard' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'expenses' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Detailed Expenses
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'analysis' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Analysis
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Inputs */}
            <div className="lg:col-span-1 space-y-6">
              {/* Income & Mortgage */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-indigo-600" />
                  Income & Mortgage
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Salary ({currency})
                    </label>
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg font-semibold"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mortgage Payment ({currency})
                    </label>
                    <input
                      type="number"
                      value={mortgagePayment}
                      onChange={(e) => setMortgagePayment(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Expenses</h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Family Expenses</label>
                    <input
                      type="number"
                      value={familyExpenses}
                      onChange={(e) => setFamilyExpenses(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School Fees</label>
                    <input
                      type="number"
                      value={school}
                      onChange={(e) => setSchool(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subscriptions</label>
                    <input
                      type="number"
                      value={subscriptions}
                      onChange={(e) => setSubscriptions(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Risk Assessment */}
              <div className={`${risk.bg} rounded-lg shadow-lg p-6 border-2 ${risk.color.replace('text-', 'border-')}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <RiskIcon className={`w-12 h-12 ${risk.color}`} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Risk Level</h3>
                      <p className={`text-3xl font-bold ${risk.color}`}>{risk.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Debt-to-Income Ratio</p>
                    <p className={`text-4xl font-bold ${risk.color}`}>{mortgagePercent.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              {/* Financial Overview */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-indigo-600" />
                  Financial Overview
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Mortgage Payment</p>
                    <p className="text-2xl font-bold text-gray-800">{formatCurrency(mortgagePayment)} {currency}</p>
                    <p className="text-sm text-blue-600 font-medium">{mortgagePercent.toFixed(1)}% of salary</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Living Expenses</p>
                    <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalLivingExpenses)} {currency}</p>
                    <p className="text-sm text-purple-600 font-medium">{livingPercent.toFixed(1)}% of salary</p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Obligations</p>
                    <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalObligations)} {currency}</p>
                    <p className="text-sm text-red-600 font-medium">{totalPercent.toFixed(1)}% of salary</p>
                  </div>
                  
                  <div className={`${remaining >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-4`}>
                    <p className="text-sm text-gray-600 mb-1">Remaining</p>
                    <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(remaining)} {currency}
                    </p>
                    <p className={`text-sm font-medium ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {remainingPercent.toFixed(1)}% of salary
                    </p>
                  </div>
                </div>
              </div>

              {/* Affordability Guidelines */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                  What You Can Afford
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">Conservative (35% Rule)</p>
                      <p className="text-sm text-gray-600">Safe and comfortable</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(maxAffordable35)} {currency}</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">Moderate (40% Rule)</p>
                      <p className="text-sm text-gray-600">Manageable but tight</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-600">{formatCurrency(maxAffordable40)} {currency}</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                  </div>
                  
                  {remaining < 0 && (
                    <div className="flex items-center space-x-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-red-800">Warning: Monthly Deficit</p>
                        <p className="text-sm text-red-700">
                          You're overspending by {formatCurrency(Math.abs(remaining))} {currency}/month 
                          ({formatCurrency(Math.abs(remaining) * 12)} {currency}/year)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Utilities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Utilities</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Electricity</label>
                  <input
                    type="number"
                    value={utilities.electricity}
                    onChange={(e) => setUtilities({...utilities, electricity: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Water</label>
                  <input
                    type="number"
                    value={utilities.water}
                    onChange={(e) => setUtilities({...utilities, water: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">House Maintenance</label>
                  <input
                    type="number"
                    value={utilities.maintenance}
                    onChange={(e) => setUtilities({...utilities, maintenance: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Internet</label>
                  <input
                    type="number"
                    value={utilities.internet}
                    onChange={(e) => setUtilities({...utilities, internet: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input
                    type="number"
                    value={utilities.mobile}
                    onChange={(e) => setUtilities({...utilities, mobile: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Total Utilities</span>
                    <span className="text-xl font-bold text-indigo-600">{formatCurrency(totalUtilities)} {currency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Expenses */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Car Expenses</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gas</label>
                  <input
                    type="number"
                    value={car.gas}
                    onChange={(e) => setCar({...car, gas: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance</label>
                  <input
                    type="number"
                    value={car.maintenance}
                    onChange={(e) => setCar({...car, maintenance: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance</label>
                  <input
                    type="number"
                    value={car.insurance}
                    onChange={(e) => setCar({...car, insurance: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Total Car</span>
                    <span className="text-xl font-bold text-indigo-600">{formatCurrency(totalCar)} {currency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Food & Groceries */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Food & Groceries</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Groceries</label>
                  <input
                    type="number"
                    value={groceries}
                    onChange={(e) => setGroceries(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Apps</label>
                  <input
                    type="number"
                    value={deliveryApps}
                    onChange={(e) => setDeliveryApps(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Total Food</span>
                    <span className="text-xl font-bold text-indigo-600">{formatCurrency(groceries + deliveryApps)} {currency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Expenses */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Other Expenses</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Family Expenses</label>
                  <input
                    type="number"
                    value={familyExpenses}
                    onChange={(e) => setFamilyExpenses(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Fees</label>
                  <input
                    type="number"
                    value={school}
                    onChange={(e) => setSchool(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subscriptions</label>
                  <input
                    type="number"
                    value={subscriptions}
                    onChange={(e) => setSubscriptions(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Health Analysis</h2>
              
              {/* Expense Breakdown */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Expense Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Mortgage Payment', value: mortgagePayment, color: 'bg-blue-500' },
                    { name: 'Utilities', value: totalUtilities, color: 'bg-purple-500' },
                    { name: 'Family Expenses', value: familyExpenses, color: 'bg-pink-500' },
                    { name: 'Food & Groceries', value: groceries + deliveryApps, color: 'bg-green-500' },
                    { name: 'Car Expenses', value: totalCar, color: 'bg-yellow-500' },
                    { name: 'School', value: school, color: 'bg-indigo-500' },
                    { name: 'Subscriptions', value: subscriptions, color: 'bg-red-500' }
                  ].map((item, index) => {
                    const percentage = (item.value / salary) * 100;
                    return (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                          <span className="text-sm font-semibold text-gray-800">
                            {formatCurrency(item.value)} {currency} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`${item.color} h-3 rounded-full transition-all duration-500`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {mortgagePercent > 40 && (
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        <strong>Critical:</strong> Your mortgage is {mortgagePercent.toFixed(1)}% of your salary. 
                        Consider refinancing to get it below {formatCurrency(maxAffordable40)} {currency}/month.
                      </p>
                    </div>
                  )}
                  
                  {remaining < 0 && (
                    <div className="flex items-start space-x-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        <strong>Urgent:</strong> You have a monthly deficit of {formatCurrency(Math.abs(remaining))} {currency}. 
                        You need to reduce expenses or increase income immediately.
                      </p>
                    </div>
                  )}
                  
                  {deliveryApps > 800 && (
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        <strong>Opportunity:</strong> Delivery apps cost {formatCurrency(deliveryApps)} {currency}/month. 
                        Reducing to {formatCurrency(deliveryApps * 0.7)} {currency} could save {formatCurrency((deliveryApps * 0.3) * 12)} {currency}/year.
                      </p>
                    </div>
                  )}
                  
                  {remaining > 0 && remaining < salary * 0.1 && (
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        <strong>Warning:</strong> You only have {formatCurrency(remaining)} {currency} ({remainingPercent.toFixed(1)}%) remaining. 
                        Build an emergency fund of at least {formatCurrency(totalObligations * 3)} {currency}.
                      </p>
                    </div>
                  )}
                  
                  {mortgagePercent <= 35 && remaining > salary * 0.15 && (
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        <strong>Excellent:</strong> Your finances are healthy! Consider investing your surplus of {formatCurrency(remaining)} {currency}/month.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Annual Projections */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Annual Projections</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Annual Salary</p>
                    <p className="text-xl font-bold text-gray-800">{formatCurrency(salary * 12)} {currency}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Annual Mortgage</p>
                    <p className="text-xl font-bold text-gray-800">{formatCurrency(mortgagePayment * 12)} {currency}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Annual Living</p>
                    <p className="text-xl font-bold text-gray-800">{formatCurrency(totalLivingExpenses * 12)} {currency}</p>
                  </div>
                  <div className={`${remaining >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-4`}>
                    <p className="text-sm text-gray-600 mb-1">Annual Savings</p>
                    <p className={`text-xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(remaining * 12)} {currency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-lg p-4 mt-6 text-center">
          <p className="text-sm text-gray-600">
            Built with React • All calculations happen in your browser • No data is stored or sent anywhere
          </p>
        </div>
      </div>
    </div>
  );
}