#!/usr/bin/env node
// Utility script to generate bcrypt hash for admin password

const bcrypt = require('bcryptjs');

if (process.argv.length < 3) {
  console.log('Usage: node generate-hash.js <password>');
  console.log('Example: node generate-hash.js "mySecurePassword123"');
  process.exit(1);
}

const password = process.argv[2];
const saltRounds = 12;

bcrypt.genSalt(saltRounds, function(err, salt) {
  if (err) {
    console.error('Error generating salt:', err);
    process.exit(1);
  }
  
  bcrypt.hash(password, salt, function(err, hash) {
    if (err) {
      console.error('Error hashing password:', err);
      process.exit(1);
    }
    
    console.log('Generated hash:');
    console.log(hash);
    console.log('\nAdd this to your environment variables as ADMIN_PASSWORD');
  });
});