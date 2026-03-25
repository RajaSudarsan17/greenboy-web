# HTTPS Configuration Guide

## Overview
This Next.js application is fully HTTPS compatible and ready for secure deployment.

## Security Features Implemented

### 1. Security Headers
The application automatically sets the following security headers:
- **Strict-Transport-Security**: Forces HTTPS for 1 year (max-age=31536000)
- **X-Content-Type-Options**: Prevents MIME sniffing (nosniff)
- **X-Frame-Options**: Prevents clickjacking (SAMEORIGIN)
- **X-XSS-Protection**: Enables browser XSS protection (1; mode=block)
- **Referrer-Policy**: Controls referrer information (strict-origin-when-cross-origin)
- **Permissions-Policy**: Restricts access to browser features (camera, microphone, geolocation)

### 2. Middleware Protection
A middleware layer (`src/middleware.ts`) enforces HTTPS by:
- Detecting HTTP requests in production
- Automatically redirecting to HTTPS version
- Preserving query parameters and paths during redirect

### 3. Content Security
All resources are HTTPS-only:
- External images from: unsplash, pexels, pixabay, vimeo, supabase
- Google Fonts for typography
- No mixed content warnings
- Environment variables use HTTPS URLs

## Deployment Checklist

- [ ] Obtain SSL/TLS certificate (Let's Encrypt recommended for free)
- [ ] Configure domain with certificate
- [ ] Set `NODE_ENV=production` in deployment environment
- [ ] Verify `NEXT_PUBLIC_SUPABASE_URL` uses HTTPS (already configured)
- [ ] Test: Visit http://yourdomain.com and verify redirect to https://yourdomain.com
- [ ] Test: Check browser console for no mixed content warnings
- [ ] Test: Verify Security tab in DevTools shows green padlock

## Hosting Platform Examples

### Vercel (Recommended)
- Automatically provides free SSL/TLS
- HTTPS enabled by default
- No additional configuration needed

### Netlify
- Free SSL/TLS via Let's Encrypt
- HTTPS enabled by default
- Set build command: `npm run build`
- Set publish directory: `.next` (if using next export)

### Docker/Self-Hosted
```bash
# Use a reverse proxy like Nginx or Apache with SSL
# Or use Let's Encrypt with Docker:
docker run -v /etc/letsencrypt:/etc/letsencrypt certbot/certbot certonly --standalone -d yourdomain.com
```

## Development vs Production

**Development** (http://localhost:4028):
- No HTTPS enforcement
- All features work normally
- Perfect for testing

**Production**:
- HTTPS enforced automatically
- Security headers applied
- HTTP → HTTPS redirect active
- Safe for production use

## Troubleshooting

### Mixed Content Warnings
- Verify all external resources use HTTPS (already done)
- Check browser console for any HTTP resource loads
- Update any custom resources to use HTTPS

### SSL Certificate Issues
- Verify certificate is valid and not expired
- Check certificate covers your domain (including www subdomain)
- Test with: https://www.sslshopper.com/ssl-checker.html

### Redirect Loop Issues
- Ensure `x-forwarded-proto` header is set by your reverse proxy
- For Vercel/Netlify: Usually handled automatically
- For self-hosted: Configure Nginx/Apache to set this header

## Testing

```bash
# Build and test production locally
npm run build
npm run serve

# Check headers (requires HTTPS)
curl -I https://yourdomain.com

# Test HTTPS enforcement
curl -I http://yourdomain.com  # Should redirect to https://
```

## Additional Resources

- [Next.js Security Best Practices](https://nextjs.org/docs/going-to-production/security-best-practices)
- [Let's Encrypt](https://letsencrypt.org/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)
