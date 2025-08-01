#!/usr/bin/env python3
"""
Simple test script for Campus LLM App
"""

import requests
import json
import sys

def test_backend():
    """Test if the backend is working"""
    print("🔧 Testing Backend...")
    
    try:
        # Test events endpoint
        response = requests.get("http://localhost:5001/api/events", timeout=5)
        if response.status_code == 200:
            events = response.json()
            print(f"✅ Backend is working! Found {len(events)} events")
            return True
        else:
            print(f"❌ Backend returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Backend is not running. Please start it with:")
        print("   cd backend && source venv/bin/activate && python app.py")
        return False
    except Exception as e:
        print(f"❌ Error testing backend: {e}")
        return False

def test_frontend_build():
    """Test if frontend can build"""
    print("🎨 Testing Frontend Build...")
    
    try:
        import subprocess
        import os
        
        # Change to frontend directory
        os.chdir("frontend")
        
        # Test build
        result = subprocess.run(["npm", "run", "build"], 
                              capture_output=True, text=True, timeout=60)
        
        if result.returncode == 0:
            print("✅ Frontend builds successfully!")
            return True
        else:
            print(f"❌ Frontend build failed: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Frontend test error: {e}")
        return False
    finally:
        # Return to root directory
        os.chdir("..")

def main():
    """Run tests"""
    print("🚀 Campus LLM App - Simple Test")
    print("=" * 40)
    
    # Test backend
    backend_ok = test_backend()
    
    # Test frontend
    frontend_ok = test_frontend_build()
    
    print("\n" + "=" * 40)
    if backend_ok and frontend_ok:
        print("🎉 All tests passed! Your app is ready!")
        return True
    else:
        print("⚠️  Some tests failed. Check the issues above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)