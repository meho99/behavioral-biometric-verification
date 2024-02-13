from flask import Flask, request, Response, abort, jsonify
from flask_cors import CORS
from faunadb import query as q
from faunadb.objects import Ref
import json
from faunadb.client import FaunaClient

app = Flask(__name__)
CORS(app)

client = FaunaClient(
  secret="fnAFZl5kTNACUYNYKXzDXfHQwWxA6eSm0FL4wu9p",
)

# ----- Login to existing user -----

# TODO: jwt tokens
@app.route('/login', methods=['POST', 'GET'])
def login():
  try:
    client.query(
        q.login(
          q.match(
            q.index("user_by_email"),
            request.get_json()['email']
          ),
          { "password": request.get_json()['password'] }
        )
      )
    
    return {
      'status': 'success',
      'message': 'Login successful',
      'email': request.get_json()['email']
    }

  except:
    return 'User does not exist. Please sign up.', 400

# ----- Sign up new user -----
  
# TODO: jwt tokens
@app.route('/signup', methods=['POST'])
def sign_up():
  try:
    existing_user = client.query(
      q.get(
        q.match(
          q.index("user_by_email"),
          request.get_json()['email']
        )
      )
    )

    if (existing_user):
      return "User already exists with this email. Please login.", 400
  except:
    print('No existing user')

  client.query(
    q.create(
      q.collection("users"),
      {
        "credentials": { "password": request.get_json()['password'] },
        "data" : { "email": request.get_json()['email'] }
      }
    )
  )

  return {
    'status': 'success',
    'message': 'Sign Up successful',
    'email': request.get_json()['email']
  }

if __name__ == '__main__':
  # run app in debug mode on port 5000
  app.run(debug=True)

