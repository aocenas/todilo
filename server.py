from flask import Flask, render_template, jsonify
app = Flask(__name__)
app.debug = True

@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/api/todos')
def all_todos():
    return jsonify(todos=[
        {'text': 'Discuss report with John', 'completed': False},
        {'text': 'Get a haircut', 'completed': True},
        {'text': 'Pay electricity bill', 'completed': True},
        {'text': 'Check gym hours', 'completed': False},
    ])


if __name__ == '__main__':
    app.run()
