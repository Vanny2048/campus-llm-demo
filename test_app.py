#!/usr/bin/env python3
"""
Simple test script for the Campus LLM App backend
"""
import requests
import json
import time

def test_backend():
    """Test the backend API endpoints"""
    base_url = "http://localhost:5001"
    
    print("🧪 Testing Campus LLM App Backend...")
    print("=" * 50)
    
    # Test 1: Events endpoint
    try:
        response = requests.get(f"{base_url}/api/events")
        if response.status_code == 200:
            events = response.json()
            print(f"✅ Events API: {len(events)} events found")
            for event in events:
                print(f"   - {event['title']} ({event['type']})")
        else:
            print(f"❌ Events API: Status {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Events API: Connection failed - server not running")
    except Exception as e:
        print(f"❌ Events API: Error - {e}")
    
    print()
    
    # Test 2: Leaderboard endpoint
    try:
        response = requests.get(f"{base_url}/api/leaderboard")
        if response.status_code == 200:
            leaderboard = response.json()
            print(f"✅ Leaderboard API: {len(leaderboard)} users found")
            for user in leaderboard:
                print(f"   - {user['name']}: {user['points']} points")
        else:
            print(f"❌ Leaderboard API: Status {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Leaderboard API: Connection failed - server not running")
    except Exception as e:
        print(f"❌ Leaderboard API: Error - {e}")
    
    print()
    
    # Test 3: Prizes endpoint
    try:
        response = requests.get(f"{base_url}/api/prizes")
        if response.status_code == 200:
            prizes = response.json()
            print(f"✅ Prizes API: {len(prizes)} prizes found")
            for prize in prizes:
                print(f"   - {prize['name']}: {prize['points_required']} points")
        else:
            print(f"❌ Prizes API: Status {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Prizes API: Connection failed - server not running")
    except Exception as e:
        print(f"❌ Prizes API: Error - {e}")
    
    print()
    
    # Test 4: Chatbot endpoint
    try:
        response = requests.post(f"{base_url}/api/genz-buddy", 
                               json={"prompt": "Hello LMU Buddy!"})
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Chatbot API: Response received")
            print(f"   - Response: {data['response']}")
        else:
            print(f"❌ Chatbot API: Status {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Chatbot API: Connection failed - server not running")
    except Exception as e:
        print(f"❌ Chatbot API: Error - {e}")
    
    print()
    print("=" * 50)
    print("🎉 Backend testing complete!")

if __name__ == "__main__":
    test_backend()