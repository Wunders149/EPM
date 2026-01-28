# EPM - English Practice Mahajanga

EPM (English Practice Mahajanga) is a Next.js web application for a free English learning community based in Mahajanga, Madagascar. It's designed as a nonprofit initiative to provide free English practice opportunities to students and English learners.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin Access

The application includes an admin dashboard at `/admin/dashboard` with the following default credentials:
- Email: `admin@epm.org`
- Password: `SecurePass2026!` (this replaces the old 'admin123' default)

**IMPORTANT SECURITY NOTICE**: For production deployments, you should immediately secure your admin credentials by setting environment variables as described below.

## Securing Admin Credentials

For production deployments (especially on Vercel), you must secure your admin credentials:

1. Set the following environment variables:
   - `ADMIN_EMAIL`: Your admin email address
   - `ADMIN_PASSWORD`: Bcrypt-hashed version of your admin password
   - `NEXTAUTH_SECRET`: Secret for NextAuth.js

2. Generate a bcrypt hash for your password using an online bcrypt hasher or this Node.js code:
   ```javascript
   const bcrypt = require('bcryptjs');
   const saltRounds = 12;
   const plainPassword = 'your-very-secure-password';
   const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
   console.log(hashedPassword);
   ```

3. On Vercel, go to your project settings → Environment Variables and add these variables.

4. After your first login with the new credentials, consider disabling the default admin account for enhanced security.

For more detailed security configuration, see [SECURITY.md](./SECURITY.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
