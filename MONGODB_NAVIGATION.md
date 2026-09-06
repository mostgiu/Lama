# MongoDB Navigation Guide

This guide covers how to navigate and interact with MongoDB using different interfaces.

## Table of Contents
1. [MongoDB Atlas Web Interface](#mongodb-atlas-web-interface)
2. [MongoDB Compass (GUI Tool)](#mongodb-compass-gui-tool)
3. [MongoDB Shell (mongosh)](#mongodb-shell-mongosh)
4. [Basic CRUD Operations](#basic-crud-operations)

---

## MongoDB Atlas Web Interface

MongoDB Atlas is the cloud-hosted MongoDB service. Here's how to navigate it:

### 1. Dashboard Overview
After logging in at [https://cloud.mongodb.com](https://cloud.mongodb.com), you'll see:

- **Left Sidebar Navigation:**
  - **Database**: View and manage your clusters
  - **Data API**: REST API for your database
  - **Atlas Search**: Full-text search capabilities
  - **Charts**: Data visualization
  - **Monitoring**: Performance metrics
  - **Backup**: Backup and restore options
  - **Security**: Network access and database users

### 2. Database Section
Click "Database" in the left sidebar:

- **Clusters**: View all your database clusters
  - Click on a cluster name to see details
  - Monitor performance, storage, and connections
  - View cluster metrics and logs

- **Browse Collections**: 
  - Click "Browse Collections" on your cluster
  - Select your database from the dropdown
  - View all collections (tables) in your database
  - Click on a collection to view documents (records)
  - You can view, edit, and delete documents directly

### 3. Database Access (User Management)
- Go to "Database Access" in the left sidebar
- View all database users
- Add new users with specific permissions
- Edit or delete existing users

### 4. Network Access (IP Whitelist)
- Go to "Network Access" in the left sidebar
- View allowed IP addresses
- Add new IP addresses to whitelist
- Important for security - only allow trusted IPs

### 5. Cluster Management
- Click on your cluster name
- Options available:
  - **Connect**: Get connection strings
  - **Metrics**: View performance graphs
  - **Logs**: View cluster logs
  - **Backup**: Configure backups
  - **Delete**: Remove the cluster

---

## MongoDB Compass (GUI Tool)

MongoDB Compass is a free desktop application for visually exploring your data.

### Installation
Download from: [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)

### Connecting to MongoDB

#### Connect to MongoDB Atlas:
1. Open MongoDB Compass
2. Click "New Connection"
3. Paste your connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myDatabase?retryWrites=true&w=majority
   ```
4. Click "Connect"

#### Connect to Local MongoDB:
1. Open MongoDB Compass
2. Click "New Connection"
3. Enter connection string:
   ```
   mongodb://localhost:27017
   ```
4. Click "Connect"

### Navigating Compass Interface

#### 1. Left Sidebar - Database List
- Shows all databases on the server
- Click on a database to expand it
- Shows all collections within the database
- Click on a collection to view its documents

#### 2. Main View - Documents
When you select a collection, you'll see:
- **Documents Tab**: View all documents in the collection
- **Schema Tab**: Analyze the structure of your data
- **Explain Plan**: See query performance
- **Aggregations**: Create complex queries

#### 3. Query Bar (Top)
- Use this to filter documents
- Example query:
  ```json
  { "username": "john" }
  ```
- Click "Find" to execute the query

#### 4. Document View
- Each row is a document (like a row in SQL)
- Click on a document to expand and view all fields
- Edit documents inline by clicking on values
- Delete documents with the trash icon

---

## MongoDB Shell (mongosh)

The MongoDB Shell is a command-line interface for interacting with MongoDB.

### Installation
```bash
# macOS (using Homebrew)
brew install mongodb-community

# Connect to MongoDB Atlas
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myDatabase"

# Connect to local MongoDB
mongosh
```

### Basic Navigation Commands

#### 1. Database Operations
```bash
# Show all databases
show dbs

# Switch to a database (or create it if it doesn't exist)
use myDatabase

# Show current database
db

# Show all collections in current database
show collections
```

#### 2. Collection Operations
```bash
# Create a new collection (happens automatically when you insert data)
db.createCollection("users")

# Drop a collection
db.users.drop()
```

#### 3. Document Operations

**Insert Documents:**
```bash
# Insert one document
db.users.insertOne({
  username: "john_doe",
  email: "john@example.com",
  password: "hashed_password_here",
  createdAt: new Date()
})

# Insert multiple documents
db.users.insertMany([
  { username: "user1", email: "user1@example.com" },
  { username: "user2", email: "user2@example.com" }
])
```

**Query Documents:**
```bash
# Find all documents
db.users.find()

# Find with pretty printing
db.users.find().pretty()

# Find with filter
db.users.find({ username: "john_doe" })

# Find with multiple conditions
db.users.find({ 
  username: "john_doe",
  email: "john@example.com"
})

# Find one document
db.users.findOne({ username: "john_doe" })

# Find with projection (select specific fields)
db.users.find(
  { username: "john_doe" },
  { username: 1, email: 1, password: 0 }
)
```

**Update Documents:**
```bash
# Update one document
db.users.updateOne(
  { username: "john_doe" },
  { $set: { email: "newemail@example.com" } }
)

# Update multiple documents
db.users.updateMany(
  { username: /^user/ },  // Regex: usernames starting with "user"
  { $set: { active: true } }
)
```

**Delete Documents:**
```bash
# Delete one document
db.users.deleteOne({ username: "john_doe" })

# Delete multiple documents
db.users.deleteMany({ username: /^test/ })
```

#### 4. Advanced Queries

**Comparison Operators:**
```bash
# Greater than
db.users.find({ age: { $gt: 18 } })

# Less than
db.users.find({ age: { $lt: 65 } })

# Greater than or equal
db.users.find({ age: { $gte: 18 } })

# Not equal
db.users.find({ status: { $ne: "inactive" } })

# In array
db.users.find({ status: { $in: ["active", "pending"] } })
```

**Logical Operators:**
```bash
# AND
db.users.find({ 
  age: { $gte: 18 },
  status: "active"
})

# OR
db.users.find({
  $or: [
    { username: "john" },
    { email: "john@example.com" }
  ]
})

# AND + OR
db.users.find({
  age: { $gte: 18 },
  $or: [
    { status: "active" },
    { status: "pending" }
  ]
})
```

**Array Operators:**
```bash
# Match array element
db.users.find({ tags: "admin" })

# Match all array elements
db.users.find({ tags: { $all: ["admin", "user"] } })

# Array size
db.users.find({ tags: { $size: 3 } })
```

**Text Search:**
```bash
# Search in text fields
db.users.find({ 
  $text: { $search: "john" } 
})
```

#### 5. Aggregation Pipeline
```bash
# Group and count
db.users.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])

# Multiple stages
db.users.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $group: { _id: "$city", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

#### 6. Indexes
```bash
# Create index
db.users.createIndex({ email: 1 })

# Create unique index
db.users.createIndex({ email: 1 }, { unique: true })

# List all indexes
db.users.getIndexes()

# Drop index
db.users.dropIndex({ email: 1 })
```

#### 7. Statistics
```bash
# Count documents
db.users.countDocuments()
db.users.countDocuments({ status: "active" })

# Database stats
db.stats()

# Collection stats
db.users.stats()
```

---

## Basic CRUD Operations Summary

### Create
```bash
db.collection.insertOne({ key: "value" })
db.collection.insertMany([{ key: "value1" }, { key: "value2" }])
```

### Read
```bash
db.collection.find()                    # Find all
db.collection.findOne({ key: "value" }) # Find one
db.collection.find({ key: "value" })    # Find with filter
```

### Update
```bash
db.collection.updateOne(
  { filter },
  { $set: { key: "new_value" } }
)
db.collection.updateMany(
  { filter },
  { $set: { key: "new_value" } }
)
```

### Delete
```bash
db.collection.deleteOne({ key: "value" })
db.collection.deleteMany({ key: "value" })
```

---

## Useful Tips

### 1. Pretty Print
Always use `.pretty()` for better readability:
```bash
db.users.find().pretty()
```

### 2. Query Operators Cheat Sheet
- `$eq` - Equal to
- `$ne` - Not equal to
- `$gt` - Greater than
- `$gte` - Greater than or equal
- `$lt` - Less than
- `$lte` - Less than or equal
- `$in` - In array
- `$nin` - Not in array
- `$and` - Logical AND
- `$or` - Logical OR
- `$not` - Logical NOT
- `$regex` - Regular expression

### 3. Common Queries for Your Application

**Find user by email:**
```bash
db.users.find({ email: "user@example.com" })
```

**Find user by username or email:**
```bash
db.users.find({
  $or: [
    { email: "user@example.com" },
    { username: "john_doe" }
  ]
})
```

**Check if user exists:**
```bash
db.users.findOne({ email: "user@example.com" })
# Returns null if not found, document if exists
```

**Count total users:**
```bash
db.users.countDocuments()
```

**Find recently created users:**
```bash
db.users.find().sort({ createdAt: -1 }).limit(10)
```

### 4. Export/Import Data

**Export collection to JSON:**
```bash
mongoexport --db=myDatabase --collection=users --out=users.json
```

**Import JSON to collection:**
```bash
mongoimport --db=myDatabase --collection=users --file=users.json
```

---

## MongoDB Compass vs Shell vs Atlas

| Feature | Atlas Web | Compass | Shell |
|---------|-----------|---------|-------|
| Visual Interface | ✅ | ✅ | ❌ |
| Query Builder | ✅ | ✅ | ❌ |
| Performance Analysis | ✅ | ✅ | ❌ |
| Automation/Scripts | ❌ | ❌ | ✅ |
| Offline Access | ❌ | ✅ | ✅ |
| Real-time Monitoring | ✅ | ❌ | ❌ |

**Recommendation:**
- Use **Atlas Web** for quick data viewing and user management
- Use **Compass** for detailed data analysis and visual query building
- Use **Shell** for automation, scripts, and advanced operations

---

## Troubleshooting

### Can't Connect to MongoDB Atlas
1. Check IP whitelist in Atlas (Network Access)
2. Verify username and password
3. Ensure connection string is correct
4. Check if cluster is running (not paused)

### Connection Timeout
- Check network connectivity
- Verify firewall settings
- Ensure MongoDB service is running (for local)

### Authentication Failed
- Double-check username and password
- Verify database user has correct permissions
- Check if user is assigned to the correct database

---

## Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Shell Documentation](https://www.mongodb.com/docs/mongodb-shell/)
- [MongoDB Compass Documentation](https://www.mongodb.com/docs/compass/)
- [MongoDB CRUD Operations](https://www.mongodb.com/docs/manual/crud/)
- [MongoDB Query Operators](https://www.mongodb.com/docs/manual/reference/operator/query/)