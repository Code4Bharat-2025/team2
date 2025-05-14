from flask import Flask, render_template, request, session, redirect, url_for
import random

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Needed for session

# Pool of all questions
all_questions = [
    {
        'question': "What is money?",
        'options': {'a': "Paper used for transactions", 'b': "Just numbers", 'c': "Stones"},
        'answer': 'a'
    },
    {
        'question': "What is a budget?",
        'options': {'a': "Way to save", 'b': "Spending plan", 'c': "Type of wallet"},
        'answer': 'b'
    },
    {
        'question': "What is savings?",
        'options': {'a': "Spending", 'b': "Borrowed money", 'c': "Money kept for later"},
        'answer': 'c'
    },
    {
        'question': "What is a bank?",
        'options': {'a': "Place to eat", 'b': "Place to keep money", 'c': "Toy shop"},
        'answer': 'b'
    },
    {
        'question': "What is income?",
        'options': {'a': "Money earned", 'b': "Money spent", 'c': "Money lost"},
        'answer': 'a'
    },
    {
        'question': "What is an expense?",
        'options': {'a': "Gift", 'b': "Money given to you", 'c': "Money you spend"},
        'answer': 'c'
    },
    {
        'question': "Why should we save money?",
        'options': {'a': "For games", 'b': "For emergencies", 'c': "To waste it"},
        'answer': 'b'
    },
    {
        'question': "What is an example of a 'want'?",
        'options': {'a': "Food", 'b': "Water", 'c': "Video game"},
        'answer': 'c'
    },
    {
        'question': "Where do we keep saved money?",
        'options': {'a': "On floor", 'b': "Bank", 'c': "In pockets"},
        'answer': 'b'
    },
    {
        'question': "What is financial literacy?",
        'options': {'a': "Knowing how to use money", 'b': "Reading novels", 'c': "Math homework"},
        'answer': 'a'
    },
    # Add more if needed
]

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/learn')
def learn():
    return render_template('learn.html')

@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
    if request.method == 'POST':
        user_answers = {q: request.form.get(q) for q in session['question_ids']}
        score = 0
        results = {}

        for i, qid in enumerate(session['question_ids']):
            q = all_questions[qid]
            user = user_answers.get(str(qid))
            correct = q['answer']
            is_correct = (user == correct)
            if is_correct:
                score += 1
            results[str(qid)] = {
                'question': q['question'],
                'options': q['options'],
                'correct': correct,
                'user': user,
                'is_correct': is_correct
            }

        return render_template('result.html', score=score, results=results)

    # GET: Select 10 random questions
    question_ids = random.sample(range(len(all_questions)), 10)
    session['question_ids'] = [str(qid) for qid in question_ids]
    selected_questions = {str(qid): all_questions[qid] for qid in question_ids}
    return render_template('quiz.html', questions=selected_questions)

if __name__ == '__main__':
    app.run(debug=True)
