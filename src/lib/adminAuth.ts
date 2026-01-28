import { compare, hash } from 'bcryptjs';

/**
 * Check if the provided credentials match the environment variable admin credentials
 */
export async function validateAdminCredentials(email: string, password: string): Promise<boolean> {
  const envAdminEmail = process.env.ADMIN_EMAIL;
  const envAdminPassword = process.env.ADMIN_PASSWORD;

  if (!envAdminEmail || !envAdminPassword) {
    // If environment variables are not set, fall back to database validation
    return false;
  }

  if (email === envAdminEmail) {
    return await compare(password, envAdminPassword);
  }

  return false;
}

/**
 * Check if the provided credentials match the default seeded admin
 * This is kept for backward compatibility during transition
 */
export async function validateDefaultAdminCredentials(email: string, password: string): Promise<boolean> {
  // Hash comparison for the default admin password 'SecurePass2026!'
  const defaultPasswordHash = '$2a$12$T8GmJ.ZQvAgEQqYrx5aMkedY.EeGwq9H6I.qJ0r/DtKv9Z.jw.wLC'; // bcrypt hash of 'SecurePass2026!'

  if (email === 'admin@epm.org') {
    return await compare(password, defaultPasswordHash);
  }

  return false;
}

/**
 * Utility function to generate a bcrypt hash for a password
 * This is exported for use in scripts or debugging
 */
export async function generatePasswordHash(password: string): Promise<string> {
  return await hash(password, 12);
}