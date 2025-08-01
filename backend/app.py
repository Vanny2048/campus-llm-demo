from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

# Sample data - in a real app, this would come from a database
events = [
    {
        "id": 1,
        "title": "LMU Basketball Game vs USC",
        "type": "sports",
        "date": "2024-02-15T19:00:00",
        "location": "Gersten Pavilion",
        "image": "https://via.placeholder.com/300x200/8C1515/FFFFFF?text=LMU+Basketball",
        "description": "Cheer on the Lions as they take on USC!",
        "rsvp_count": 45,
        "max_capacity": 100
    },
    {
        "id": 2,
        "title": "Spring Concert in the Sunken Garden",
        "type": "music",
        "date": "2024-02-20T18:00:00",
        "location": "Sunken Garden",
        "image": "https://via.placeholder.com/300x200/8C1515/FFFFFF?text=Spring+Concert",
        "description": "Live music under the stars!",
        "rsvp_count": 78,
        "max_capacity": 150
    },
    {
        "id": 3,
        "title": "Study Night at the Library",
        "type": "academic",
        "date": "2024-02-18T20:00:00",
        "location": "William H. Hannon Library",
        "image": "https://via.placeholder.com/300x200/8C1515/FFFFFF?text=Study+Night",
        "description": "Group study session with snacks provided!",
        "rsvp_count": 23,
        "max_capacity": 50
    }
]

users = [
    {
        "id": 1,
        "name": "Alex Johnson",
        "email": "alex.johnson@lmu.edu",
        "points": 1250,
        "badges": ["First Event", "Sports Fan", "Social Butterfly"],
        "avatar": "https://via.placeholder.com/100x100/8C1515/FFFFFF?text=AJ"
    },
    {
        "id": 2,
        "name": "Sarah Chen",
        "email": "sarah.chen@lmu.edu",
        "points": 980,
        "badges": ["First Event", "Music Lover"],
        "avatar": "https://via.placeholder.com/100x100/8C1515/FFFFFF?text=SC"
    }
]

prizes = [
    {
        "id": 1,
        "name": "LMU Hoodie",
        "points_required": 500,
        "image": "https://via.placeholder.com/200x200/8C1515/FFFFFF?text=Hoodie",
        "description": "Comfortable LMU branded hoodie"
    },
    {
        "id": 2,
        "name": "Campus Dining Credit",
        "points_required": 300,
        "image": "https://via.placeholder.com/200x200/8C1515/FFFFFF?text=Dining",
        "description": "$25 credit for campus dining"
    },
    {
        "id": 3,
        "name": "Bookstore Gift Card",
        "points_required": 750,
        "image": "https://via.placeholder.com/200x200/8C1515/FFFFFF?text=Books",
        "description": "$50 gift card for the LMU bookstore"
    }
]

@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(events)

@app.route('/api/events/<int:event_id>/rsvp', methods=['POST'])
def rsvp_event(event_id):
    event = next((e for e in events if e['id'] == event_id), None)
    if event:
        if event['rsvp_count'] < event['max_capacity']:
            event['rsvp_count'] += 1
            return jsonify({"success": True, "message": "RSVP successful!"})
        else:
            return jsonify({"success": False, "message": "Event is full!"}), 400
    return jsonify({"success": False, "message": "Event not found!"}), 404

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    sorted_users = sorted(users, key=lambda x: x['points'], reverse=True)
    return jsonify(sorted_users)

@app.route('/api/prizes', methods=['GET'])
def get_prizes():
    return jsonify(prizes)

@app.route('/api/checkin', methods=['POST'])
def checkin():
    data = request.get_json()
    user_id = data.get('user_id')
    event_id = data.get('event_id')
    
    # In a real app, you'd validate the check-in and award points
    user = next((u for u in users if u['id'] == user_id), None)
    if user:
        points_earned = random.randint(10, 50)
        user['points'] += points_earned
        return jsonify({
            "success": True, 
            "message": f"Check-in successful! +{points_earned} points",
            "points_earned": points_earned
        })
    
    return jsonify({"success": False, "message": "User not found!"}), 404

@app.route('/api/genz-buddy', methods=['POST'])
def genz_buddy():
    data = request.get_json()
    prompt = data.get('prompt', '')
    
    # Simple mock responses - in Step 6, this will connect to the actual Llama model
    responses = [
        "OMG that's totally valid! 💅✨",
        "Periodt! You're absolutely right about that! 🔥",
        "No cap, that's the tea! ☕",
        "Slay! You're doing amazing sweetie! 💁‍♀️",
        "That's giving... everything! 💯",
        "Literally same bestie! 😭",
        "You ate that up! 👏",
        "That's so fetch! 💖"
    ]
    
    response = random.choice(responses)
    return jsonify({
        "response": response,
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)