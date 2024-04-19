from flask import Flask
from flask_cors import CORS

from blueprints.user import user_bp
from blueprints.strokes import strokes_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_bp)
app.register_blueprint(strokes_bp)


if __name__ == "__main__":
    # run app in debug mode on port 5000
    app.run(debug=True)
