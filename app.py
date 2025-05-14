import json

from flask import Flask, render_template, request

app = Flask(__name__)

# Define quiz questions and correct answers
with open('questions/beginner.json', 'r') as file:
    topic1 = file.read()
questions = json.loads(topic1)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/learn')
def learn():
    return render_template('learn.html')


@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
    if request.method == 'POST':
        user_answers = {q: request.form.get(q) for q in questions}
        results = {}
        score = 0

        for q_id, q_data in questions.items():
            correct = q_data['answer']
            user = user_answers.get(q_id)
            is_correct = (user == correct)
            if is_correct:
                score += 1
            results[q_id] = {
                'question': q_data['question'],
                'options': q_data['options'],
                'correct': correct,
                'user': user,
                'is_correct': is_correct
            }

        return render_template('result.html', score=score, results=results)

    return render_template('quiz.html', questions=questions)


if __name__ == '__main__':
    app.run(debug=True)
