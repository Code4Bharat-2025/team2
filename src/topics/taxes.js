// topics/taxes.js
const taxes = {
    id: "taxes",
    name: "Taxes",
    icon: "📊",
    levels: [
      "Taxes are payments to the government based on income or purchases.",
      "Income tax, sales tax, and property tax are common types.",
      "Paying taxes helps fund schools, roads, and hospitals."
    ],
    quizzes: [
      {
        question: "What are taxes?",
        options: ["Money you borrow", "Payments to the government", "Random deductions"],
        answer: 1
      },
      {
        question: "Which is a type of tax?",
        options: ["Income tax", "Birthday tax", "Water tax"],
        answer: 0
      },
      {
        question: "What do taxes help fund?",
        options: ["Shopping", "Games", "Schools and roads"],
        answer: 2
      }
    ]
  };
  
  export default taxes;
  