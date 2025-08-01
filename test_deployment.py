#!/usr/bin/env python3
"""
Deployment Test Script for Campus LLM App
Tests all components to ensure they work correctly before deployment.
"""

import requests
import json
import time
import subprocess
import sys
import os

def test_backend_api():
    """Test the Flask backend API endpoints"""
    print("🔧 Testing Backend API...")
    
    base_url = "http://localhost:5001"
    
    # Test events endpoint
    try:
        response = requests.get(f"{base_url}/api/events")
        if response.status_code == 200:
            events = response.json()
            print(f"✅ Events API: {len(events)} events found")
        else:
            print(f"❌ Events API failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Events API error: {e}")
        return False
    
    # Test users endpoint
    try:
        response = requests.get(f"{base_url}/api/users")
        if response.status_code == 200:
            users = response.json()
            print(f"✅ Users API: {len(users)} users found")
        else:
            print(f"❌ Users API failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Users API error: {e}")
        return False
    
    # Test leaderboard endpoint
    try:
        response = requests.get(f"{base_url}/api/leaderboard")
        if response.status_code == 200:
            leaderboard = response.json()
            print(f"✅ Leaderboard API: {len(leaderboard)} users in leaderboard")
        else:
            print(f"❌ Leaderboard API failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Leaderboard API error: {e}")
        return False
    
    # Test prizes endpoint
    try:
        response = requests.get(f"{base_url}/api/prizes")
        if response.status_code == 200:
            prizes = response.json()
            print(f"✅ Prizes API: {len(prizes)} prizes found")
        else:
            print(f"❌ Prizes API failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Prizes API error: {e}")
        return False
    
    # Test RSVP endpoint
    try:
        response = requests.post(f"{base_url}/api/events/1/rsvp")
        if response.status_code == 200:
            result = response.json()
            print(f"✅ RSVP API: {result.get('message', 'Success')}")
        else:
            print(f"❌ RSVP API failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ RSVP API error: {e}")
        return False
    
    # Test chatbot endpoint
    try:
        response = requests.post(f"{base_url}/api/genz-buddy", 
                               json={"prompt": "Hello!"})
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Chatbot API: {result.get('response', 'Response received')}")
        else:
            print(f"❌ Chatbot API failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Chatbot API error: {e}")
        return False
    
    print("✅ Backend API tests passed!")
    return True

def test_frontend_build():
    """Test if the React frontend can build successfully"""
    print("🎨 Testing Frontend Build...")
    
    try:
        # Change to frontend directory
        os.chdir("frontend")
        
        # Test if node_modules exists
        if not os.path.exists("node_modules"):
            print("📦 Installing frontend dependencies...")
            subprocess.run(["npm", "install"], check=True)
        
        # Test build
        print("🔨 Building frontend...")
        subprocess.run(["npm", "run", "build"], check=True)
        
        print("✅ Frontend build successful!")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Frontend build failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Frontend test error: {e}")
        return False
    finally:
        # Return to root directory
        os.chdir("..")

def test_dependencies():
    """Test if all dependencies are properly installed"""
    print("📦 Testing Dependencies...")
    
    # Test backend dependencies
    try:
        import flask
        import flask_cors
        print("✅ Backend dependencies installed")
    except ImportError as e:
        print(f"❌ Backend dependency missing: {e}")
        return False
    
    # Test frontend dependencies
    try:
        package_json = json.load(open("frontend/package.json"))
        required_deps = ["react", "@mui/material", "axios", "react-router-dom"]
        
        for dep in required_deps:
            if dep not in package_json.get("dependencies", {}):
                print(f"❌ Frontend dependency missing: {dep}")
                return False
        
        print("✅ Frontend dependencies configured")
        return True
        
    except Exception as e:
        print(f"❌ Frontend dependencies test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Campus LLM App - Deployment Test Suite")
    print("=" * 50)
    
    tests = [
        ("Dependencies", test_dependencies),
        ("Backend API", test_backend_api),
        ("Frontend Build", test_frontend_build),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n🧪 Running {test_name} Test...")
        if test_func():
            passed += 1
        else:
            print(f"❌ {test_name} test failed!")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Your app is ready for deployment!")
        return True
    else:
        print("⚠️  Some tests failed. Please fix the issues before deploying.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)