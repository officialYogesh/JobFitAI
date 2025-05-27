# Deployment Setup

## Vercel + GitHub Direct Integration

This project uses Vercel's native Git integration to automatically deploy the frontend on both preview (PRs) and production (main branch) environments directly from GitHub.

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub

### Setup Steps

#### 1. Connect GitHub Repository to Vercel

1. **Login to Vercel**: Go to [vercel.com](https://vercel.com) and sign in
2. **Import Project**: Click "Add New..." → "Project"
3. **Connect GitHub**: Authorize Vercel to access your GitHub account
4. **Select Repository**: Choose your `JobFitAI` repository
5. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `pnpm run build`
   - **Install Command**: `pnpm install`
   - **Output Directory**: `.next` (default)

#### 2. Configure Build Settings

In your Vercel project dashboard → Settings → General:

```
Framework Preset: Next.js
Build & Development Settings:
├── Build Command: pnpm run build
├── Install Command: pnpm install
├── Development Command: pnpm run dev
└── Root Directory: frontend
```

#### 3. Environment Variables (Optional)

If you need environment variables:

- Go to project Settings → Environment Variables
- Add variables for Production, Preview, and Development environments

#### 4. Branch Configuration

Vercel automatically configures:

- **Production Branch**: `main` (deploys to your custom domain)
- **Preview Branches**: All other branches and PRs (generates preview URLs)

### How It Works

#### Automatic Deployments

**Production Deployments**:

- Triggered on every push to `main` branch
- Deploys to your production domain
- Zero-downtime deployments

**Preview Deployments**:

- Created for every push to non-main branches
- Generated for every pull request
- Unique URL for each deployment
- Automatic comments on PRs with preview links

#### Build Process

1. **Code Push**: You push code to GitHub
2. **Webhook Trigger**: GitHub notifies Vercel of changes
3. **Build Start**: Vercel clones repo and runs build
4. **Deployment**: Live deployment after successful build

### Workflow Features

- ✅ **Zero-config deployments** after initial setup
- ✅ **Automatic preview URLs** for all PRs and branches
- ✅ **Production deployments** on main branch
- ✅ **Build caching** for faster deployments
- ✅ **pnpm support** out of the box
- ✅ **Monorepo support** with root directory setting
- ✅ **Instant rollbacks** to previous deployments

### Monitoring & Management

#### Vercel Dashboard

- **Deployments**: View all deployment history and logs
- **Analytics**: Monitor performance and usage
- **Functions**: View serverless function logs (if applicable)
- **Domains**: Manage custom domains and SSL

#### GitHub Integration

- **Status Checks**: Deployment status on PRs
- **Comments**: Automatic preview URL comments
- **Notifications**: GitHub notifications for deployment events

### Advanced Configuration

#### Custom Domains

1. Go to project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificates are automatically provisioned

#### Deployment Protection

- **Password Protection**: Protect preview deployments
- **Vercel Authentication**: Require Vercel login for previews

### Troubleshooting

#### Common Issues

1. **Build Fails**:

   - Check build logs in Vercel dashboard
   - Verify `pnpm.lock` is committed
   - Ensure all dependencies are properly defined

2. **Wrong Directory**:

   - Verify Root Directory is set to `frontend`
   - Check that build commands are relative to root directory

3. **Environment Variables**:
   - Ensure all required env vars are set in Vercel dashboard
   - Check that variable names match exactly

#### Debug Steps

```bash
# Test local build (should match Vercel build)
cd frontend
pnpm install
pnpm run build

# Check for build issues
pnpm run lint
```

### Benefits of Direct Integration

- **Simpler Setup**: No need to manage GitHub Actions secrets
- **Better Performance**: Optimized build infrastructure
- **Automatic Optimization**: Image optimization, caching, CDN
- **Zero Maintenance**: No workflow files to maintain
- **Better Debugging**: Rich build logs and debugging tools
