# Step 1: Use an official Node.js runtime as the base image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port the app will run on (change if necessary)
EXPOSE 5000

# Step 7: Define the command to run the app
CMD ["npm", "start"]
