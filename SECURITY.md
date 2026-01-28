# Security Configuration for EPM Application

## Admin Authentication Security

This document outlines the security measures implemented to protect admin credentials on your Vercel-deployed EPM application.

## Environment Variables Setup

To secure your admin credentials, you need to configure the following environment variables on Vercel:

### Required Environment Variables:

1. `ADMIN_EMAIL` - The email address for your admin account
2. `ADMIN_PASSWORD` - The bcrypt-hashed password for your admin account
3. `NEXTAUTH_SECRET` - Secret for NextAuth.js (already configured)

### Setting Up Environment Variables on Vercel:

1. Go to your Vercel dashboard
2. Select your EPM project
3. Navigate to Settings → Environment Variables
4. Add the following variables:

```
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=$2a$12$your-bcrypt-hashed-password-here
NEXTAUTH_SECRET=your-generated-secret-here
```

### Generating a Secure Password Hash:

To generate a bcrypt hash for your password, you can use an online bcrypt hasher or run this Node.js code:

```javascript
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const plainPassword = 'your-very-secure-password';
const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
console.log(hashedPassword);
```

## Important Security Notes:

1. **Change the default password immediately**: If you're using the seeded default account, change the password as soon as possible after first login.

2. **Disable the default admin account**: Once you've set up your environment variable admin account, consider removing or disabling the default seeded admin account.

3. **Use strong passwords**: Ensure your admin password is strong and unique.

4. **Regular security audits**: Periodically review and update your admin credentials.

## Fallback Authentication:

The system maintains backward compatibility with the default seeded admin account ('admin@epm.org' with the default password) for migration purposes. This should be disabled after you've set up your environment variable-based admin account.

## Additional Security Recommendations:

1. **Enable 2FA**: Consider implementing two-factor authentication for admin accounts
2. **IP Restrictions**: Restrict admin access to known IP addresses if possible
3. **Rate Limiting**: Implement rate limiting to prevent brute force attacks
4. **Monitor Access**: Regularly monitor admin access logs