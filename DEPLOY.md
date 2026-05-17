# 🚀 Deploy to Google Cloud Run

## Prerequisites
- A Google Cloud account → https://console.cloud.google.com
- Google Cloud CLI installed → https://cloud.google.com/sdk/docs/install

---

## Step 1 — Install & Login to gcloud

```bash
# After installing gcloud CLI, login:
gcloud auth login

# Set your project (create one at console.cloud.google.com if needed)
gcloud config set project YOUR_PROJECT_ID
```

---

## Step 2 — Enable Required APIs

```bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com
```

---

## Step 3 — Build & Push the Docker Image

```bash
# Navigate to the project folder
cd github-dev-card

# Build and submit the image to Google Cloud (no local Docker needed!)
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/github-dev-card
```

> Replace `YOUR_PROJECT_ID` with your actual GCP project ID.

---

## Step 4 — Deploy to Cloud Run

```bash
gcloud run deploy github-dev-card \
  --image gcr.io/YOUR_PROJECT_ID/github-dev-card \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

After ~1 minute, you'll see:
```
Service URL: https://github-dev-card-xxxxxxxxxx-uc.a.run.app
```

✅ That's your live URL — open it in the browser!

---

## One-Command Update (after any code change)

```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/github-dev-card && \
gcloud run deploy github-dev-card \
  --image gcr.io/YOUR_PROJECT_ID/github-dev-card \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

---

## Tips

| Thing | Detail |
|-------|--------|
| Free tier | Cloud Run has a generous free tier (2M requests/month) |
| Scaling | Scales to zero when not in use — no idle cost |
| Region | Change `us-central1` to any region closer to your users |
| Custom domain | Console → Cloud Run → your service → "Manage Custom Domains" |
