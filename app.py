from flask import Flask, render_template, request

app = Flask(__name__)

# Home route
@app.route('/')
def home():
    return render_template('home.html')

# Quiz route
@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
    if request.method == 'POST':
        score = 0
        answers = {
            'q1': 'a',  # Correct answer for question 1
            'q2': 'b',  # Correct answer for question 2
            'q3': 'c'   # Correct answer for question 3
        }

        for question, correct_answer in answers.items():
            user_answer = request.form.get(question)
            if user_answer == correct_answer:
                score += 1

        return render_template('result.html', score=score)

    return render_template('quiz.html')

if __name__ == '__main__':
    app.run(debug=True)
