from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Change this to a secure secret key

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        consultancy_type = request.form.get('consultancy-type')
        message = request.form.get('message')

        # Here you can add logic to send email, save to database, etc.
        # For now, just print to console and flash a message
        print(f"New appointment request: {name}, {email}, {phone}, {consultancy_type}, {message}")

        flash('Your message has been sent successfully. We\'ll get back to you shortly.', 'success')
        return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
