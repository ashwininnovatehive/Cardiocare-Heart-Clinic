from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # This will load templates/index.html

@app.route('/cardiology.html')
def cardiology():
    return render_template('cardiology.html')

@app.route('/complex-coronary-angioplasty.html')
def complex_coronary_angioplasty():
    return render_template('complex-coronary-angioplasty.html')

@app.route('/ep-study.html')
def ep_study():
    return render_template('ep-study.html')

@app.route('/heart-failure.html')
def heart_failure():
    return render_template('heart-failure.html')

@app.route('/hospital-affiliations.html')
def hospital_affiliations():
    return render_template('hospital-affiliations.html')

@app.route('/pacemaker.html')
def pacemaker():
    return render_template('pacemaker.html')

@app.route('/peripheral-angioplasty.html')
def peripheral_angioplasty():
    return render_template('peripheral-angioplasty.html')

@app.route('/tavr.html')
def tavr():
    return render_template('tavr.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/testimonials.html')
def testimonials():
    return render_template('testimonials.html')

@app.route('/gallery.html')
def gallery():
    return render_template('gallery.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000)