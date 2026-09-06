# MongoDB Cluster Setup Guide

## Option 1: MongoDB Atlas (Recommended - Cloud Hosted)

### Step 1: Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database)
2. Click "Try Free" or "Sign Up"
3. Create an account with your email or Google/GitHub account
4. Verify your email address

### Step 2: Create a New Cluster
1. After logging in, you'll see the Atlas dashboard
2. Click "Build a Database" or "Create a Cluster"
3. Choose your deployment option:
   - **M0 Sandbox (Free)**: Best for development, 512MB storage
   - **M10+**: Paid options for production
4. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
5. Choose a region closest to your users
6. Name your cluster (default: "Cluster0")
7. Click "Create Cluster"

### Step 3: Set Up Database Access
1. In the left sidebar, go to "Database Access"
2. Click "Add New Database User"
3. Choose authentication method: "Password"
4. Enter a username and strong password (save these!)
5. Set database user privileges:
   - For development: "Read and write to any database"
   - For production: More restrictive permissions
6. Click "Add User"

### Step 4: Set Up Network Access
1. In the left sidebar, go to "Network Access"
2. Click "Add IP Address"
3. Choose one of:
   - **Add Current IP Address**: For development from your current location
   - **Allow Access from Anywhere (0.0.0.0/0)**: For development (less secure)
   - **Specific IPs**: For production, add your server IPs
4. Add a description (e.g., "My Development Machine")
5. Click "Confirm"

### Step 5: Get Connection String
1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select your driver version (Node.js) and version
5. Copy the connection string (it will look like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your actual credentials
7. Add your database name after the `.net/` part:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myDatabase?retryWrites=true&w=majority
   ```

### Step 6: Store Connection String Securely
Create a `.env` file in your project root (if you don't have one):

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myDatabase?retryWrites=true&w=majority
```

**Important**: Add `.env` to your `.gitignore` file to prevent committing secrets!

## Option 2: Local MongoDB Installation

### macOS (using Homebrew)
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify it's running
mongosh
```

### Ubuntu/Debian
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Windows
1. Download MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Follow the installation wizard
4. Start MongoDB service from Services or Command Prompt

### Local Connection String
For local MongoDB, use:
```
mongodb://localhost:27017/myDatabase
```

## Next Steps

After creating your cluster, you can connect to it from your Next.js application using a MongoDB driver like:
- **Mongoose** (recommended for Node.js)
- **MongoDB Node.js Driver**

### Example with Mongoose:
```bash
npm install mongoose
```

```javascript
// lib/mongodb.js
import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectMongoDB;
```

## Security Best Practices

1. **Never commit credentials** to version control
2. **Use environment variables** for sensitive data
3. **Enable authentication** on your MongoDB cluster
4. **Restrict network access** to specific IPs in production
5. **Use strong passwords** for database users
6. **Enable encryption** at rest and in transit
7. **Regular backups** for production databases

## Useful Commands

### MongoDB Shell (mongosh)
```bash
# Connect to MongoDB
mongosh "mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myDatabase"

# Show databases
show dbs

# Use a database
use myDatabase

# Show collections
show collections

# Find documents
db.users.find()

# Insert a document
db.users.insertOne({ name: "John Doe", email: "john@example.com" })
```

## Troubleshooting

- **Connection timeout**: Check network access settings in Atlas
- **Authentication failed**: Verify username and password
- **IP not whitelisted**: Add your IP to Network Access in Atlas
- **Database not found**: Create the database by inserting a document

## Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)