# 🎥 Plausio

A full-stack **video sharing platform** built with React, Node.js, and AWS. Users can upload videos, stream them using **HLS (HTTP Live Streaming)**, interact with content, and manage subscriptions.


## ✨ Features

- 📤 Upload videos with thumbnails and metadata
- 🎥 HLS video streaming for smooth playback
- ❤️ Like videos
- 💬 Comment on videos
- 🔄 Share videos
- 🔔 Subscribe to channels
- 👤 View channel details
  - Total subscribers
  - Total videos
  - Total views
- 📂 Manage personal subscriptions
- 🔐 Google OAuth authentication

---

## 🏗️ Architecture

When a user uploads a video:

1. The video is uploaded to **AWS S3**.
2. A message is pushed to **AWS SQS**.
3. A worker running on **AWS EC2** consumes the queue.
4. **FFmpeg** transcodes the video into HLS format (`.m3u8` playlist + `.ts` segments).
5. The generated files are uploaded back to **AWS S3**.
6. **AWS CloudFront** serves the HLS content with low latency.
7. The frontend streams the video using the generated HLS playlist.

This asynchronous pipeline keeps uploads responsive while handling video processing efficiently.

---

## 🚀 Tech Stack

### Frontend

- React.js
- Tailwind CSS
- React Query
- React Router
- shadcn/ui

### Backend

- Node.js
- Express.js
- Prisma ORM
- Google OAuth
- Docker
- FFmpeg

### Cloud

- AWS S3
- AWS EC2
- AWS SQS
- AWS CloudFront
- Vercel

---

## 🎬 HLS Streaming

The platform uses **HTTP Live Streaming (HLS)** for video delivery.

Each uploaded video is converted into:

- `.m3u8` playlist
- Multiple `.ts` video segments

Instead of downloading the entire video at once, the player fetches only the required segments while the user watches the video, resulting in:

- ⚡ Faster startup
- 📶 Better playback on varying network conditions
- 💾 Lower bandwidth usage
- 🎥 Smooth streaming experience

---

## 🌐 Live Demo

👉 https://plausio.vercel.app

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
