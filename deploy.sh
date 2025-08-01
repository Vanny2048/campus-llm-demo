#!/bin/bash

# Campus LLM App Deployment Script
# This script helps you deploy your app to free hosting platforms

set -e  # Exit on any error

echo "🚀 Campus LLM App - Deployment Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "backend/app.py" ] || [ ! -f "frontend/package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Function to run tests
run_tests() {
    print_status "Running deployment tests..."
    if python test_deployment.py; then
        print_success "All tests passed!"
    else
        print_error "Tests failed! Please fix issues before deploying."
        exit 1
    fi
}

# Function to check git status
check_git() {
    print_status "Checking git status..."
    
    if [ ! -d ".git" ]; then
        print_error "This is not a git repository. Please initialize git first:"
        echo "  git init"
        echo "  git add ."
        echo "  git commit -m 'Initial commit'"
        exit 1
    fi
    
    # Check if there are uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "You have uncommitted changes. Please commit them first:"
        echo "  git add ."
        echo "  git commit -m 'Ready for deployment'"
        echo ""
        read -p "Do you want to commit changes now? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git add .
            git commit -m "Ready for deployment"
            print_success "Changes committed!"
        else
            print_error "Please commit changes before deploying"
            exit 1
        fi
    fi
    
    # Check if remote is set
    if [ -z "$(git remote -v)" ]; then
        print_warning "No remote repository set. Please add your GitHub repository:"
        echo "  git remote add origin https://github.com/YOUR_USERNAME/campus-llm.git"
        echo "  git push -u origin main"
        exit 1
    fi
}

# Function to push to GitHub
push_to_github() {
    print_status "Pushing to GitHub..."
    git push origin main
    print_success "Code pushed to GitHub!"
}

# Function to show deployment options
show_deployment_options() {
    echo ""
    echo "🎯 Choose your deployment option:"
    echo "1. Render + Vercel (Recommended - Free hosting)"
    echo "2. Streamlit Community Cloud (Simpler - Free hosting)"
    echo "3. Docker (Advanced - Any cloud platform)"
    echo "4. Manual deployment instructions"
    echo "5. Exit"
    echo ""
}

# Function to show Render + Vercel instructions
show_render_vercel_instructions() {
    echo ""
    echo "📋 Render + Vercel Deployment Instructions"
    echo "=========================================="
    echo ""
    echo "Step 1: Deploy Backend to Render"
    echo "--------------------------------"
    echo "1. Go to https://render.com and sign up"
    echo "2. Click 'New +' → 'Web Service'"
    echo "3. Connect your GitHub repository"
    echo "4. Configure the service:"
    echo "   - Name: campus-llm-backend"
    echo "   - Build Command: pip install -r backend/requirements.txt"
    echo "   - Start Command: cd backend && python app.py"
    echo "   - Environment Variables:"
    echo "     PORT=10000"
    echo "     FLASK_ENV=production"
    echo "5. Click 'Create Web Service'"
    echo "6. Note your backend URL: https://your-app-name.onrender.com"
    echo ""
    
    echo "Step 2: Deploy Frontend to Vercel"
    echo "---------------------------------"
    echo "1. Go to https://vercel.com and sign up"
    echo "2. Click 'New Project'"
    echo "3. Import your GitHub repository"
    echo "4. Configure the project:"
    echo "   - Framework Preset: Create React App"
    echo "   - Root Directory: frontend"
    echo "   - Build Command: npm run build"
    echo "   - Output Directory: build"
    echo "5. Add Environment Variable:"
    echo "   REACT_APP_API_URL=https://your-backend-name.onrender.com"
    echo "6. Click 'Deploy'"
    echo "7. Your app will be available at: https://your-app-name.vercel.app"
    echo ""
    
    print_success "Deployment complete! Your app is now live!"
}

# Function to show Streamlit instructions
show_streamlit_instructions() {
    echo ""
    echo "📋 Streamlit Deployment Instructions"
    echo "===================================="
    echo ""
    echo "This option converts your app to Streamlit for simpler deployment."
    echo ""
    echo "Step 1: Create Streamlit App"
    echo "----------------------------"
    echo "1. Create a new file called 'streamlit_app.py' in the root directory"
    echo "2. Add your Streamlit code (see README.md for example)"
    echo "3. Test locally: streamlit run streamlit_app.py"
    echo ""
    
    echo "Step 2: Deploy to Streamlit Community Cloud"
    echo "-------------------------------------------"
    echo "1. Go to https://share.streamlit.io and sign up"
    echo "2. Connect your GitHub repository"
    echo "3. Set the path to: streamlit_app.py"
    echo "4. Click 'Deploy'"
    echo "5. Your app will be available at: https://your-app-name.streamlit.app"
    echo ""
    
    print_success "Deployment complete! Your app is now live!"
}

# Function to show Docker instructions
show_docker_instructions() {
    echo ""
    echo "📋 Docker Deployment Instructions"
    echo "================================="
    echo ""
    echo "Step 1: Create Dockerfile"
    echo "-------------------------"
    echo "1. Create a Dockerfile in the root directory (see README.md for example)"
    echo "2. Build the image: docker build -t campus-llm ."
    echo "3. Test locally: docker run -p 5000:5000 campus-llm"
    echo ""
    
    echo "Step 2: Deploy to Cloud Platform"
    echo "--------------------------------"
    echo "Choose your platform:"
    echo "- AWS: Use AWS ECS or App Runner"
    echo "- Google Cloud: Use Cloud Run"
    echo "- Azure: Use Azure Container Instances"
    echo "- DigitalOcean: Use App Platform"
    echo ""
    
    print_success "Deployment complete! Your app is now live!"
}

# Function to show manual instructions
show_manual_instructions() {
    echo ""
    echo "📋 Manual Deployment Instructions"
    echo "================================="
    echo ""
    echo "For detailed manual deployment instructions, see:"
    echo "1. README.md - Complete deployment guide"
    echo "2. DEPLOYMENT.md - Detailed deployment documentation"
    echo ""
    echo "Quick commands:"
    echo "1. Test your app: python test_deployment.py"
    echo "2. Start backend: cd backend && python app.py"
    echo "3. Start frontend: cd frontend && npm start"
    echo ""
}

# Main deployment flow
main() {
    print_status "Starting deployment process..."
    
    # Run tests first
    run_tests
    
    # Check git status
    check_git
    
    # Push to GitHub
    push_to_github
    
    # Show deployment options
    while true; do
        show_deployment_options
        read -p "Enter your choice (1-5): " choice
        
        case $choice in
            1)
                show_render_vercel_instructions
                break
                ;;
            2)
                show_streamlit_instructions
                break
                ;;
            3)
                show_docker_instructions
                break
                ;;
            4)
                show_manual_instructions
                break
                ;;
            5)
                print_status "Exiting..."
                exit 0
                ;;
            *)
                print_error "Invalid choice. Please enter 1-5."
                ;;
        esac
    done
    
    echo ""
    print_success "Deployment instructions completed!"
    echo ""
    echo "🎉 Next steps:"
    echo "1. Follow the deployment instructions above"
    echo "2. Test your deployed app"
    echo "3. Share your app URL with users"
    echo ""
    echo "Need help? Check the troubleshooting section in README.md"
}

# Run the main function
main "$@"