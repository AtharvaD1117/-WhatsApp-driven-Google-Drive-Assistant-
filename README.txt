# WhatsApp Drive Assistant

A WhatsApp bot that allows users to interact with Google Drive via WhatsApp messages. Supports listing files, uploading, moving, deleting, renaming, and summarizing files. Currently uses stub functions for testing; full Google Drive integration can be added later.

## Features

*LIST** `/FolderName` – List files in a folder
*DELETE** `/FolderName/file.pdf` – Delete a file
*MOVE** `/FolderName/file.pdf /Archive` – Move a file to another folder
*RENAME** `file.pdf NewFileName.pdf` – Rename a file
*SUMMARY** `/FolderName` – Provides a summary of files (stub/AI-powered)
*UPLOAD** – Upload files sent via WhatsApp with optional folder and new filename

## WhatsApp Commands

| Command | Example                                              | Response                                   |
| ------- | ---------------------------------------------------- | ------------------------------------------ |
| LIST    | `LIST /Reports`                                      | Lists files in `/Reports`                  |
| DELETE  | `DELETE /Reports/report1.pdf`                        | Deletes the file                           |
| MOVE    | `MOVE /Reports/report1.pdf /Archive`                 | Moves the file                             |
| RENAME  | `RENAME report1.pdf final_report.pdf`                | Renames the file                           |
| SUMMARY | `SUMMARY /Reports`                                   | Provides a summary of files in folder      |
| UPLOAD  | Send file + message `UPLOAD /Reports new_report.pdf` | Uploads file to folder, optionally renames |

---

## Installation

1. Clone the repository:

bash
git clone https://github.com/yourusername/whatsapp-drive-assistant.git
cd whatsapp-drive-assistant


2. Install dependencies:

bash
npm install

3. Create a `.env` file:

env
PORT=3000
BASE_URL=https://your-ngrok-or-server-url

## Usage

1. Start the server:

bash
npm start

2. Use **ngrok** or another public tunnel to expose your local server:

bash
ngrok http 3000

3. Set your Twilio WhatsApp webhook URL to:

https://<your-ngrok-id>.ngrok.io/webhook

4. Send WhatsApp messages to the bot:

* `LIST /Reports` → Lists stub files
* `UPLOAD` → Uploads previously sent media
* `DELETE /Reports/report1.pdf` → Deletes stub file
* `MOVE /Reports/report1.pdf /Archive` → Moves stub file
* `RENAME report1.pdf final_report.pdf` → Renames stub file
* `SUMMARY /Reports` → Returns stub summary

## Upload Flow Example

1. Send a file via WhatsApp.
2. Send the message:

UPLOAD /Reports new_report.pdf

## Folder Structure
whatsapp-drive-assistant/
├─ app.js
├─ drive.js
├─ oauth.js
├─ package.json
├─ package-lock.json
├─ .env
└─ README.md

* `app.js` – Main server and webhook handling
* `drive.js` – Handles commands and stub Google Drive functions
* `oauth.js` – Google OAuth routes
* `.env` – Environment variables

## Notes

* Currently uses **stubbed functions** for testing.
* Google Drive integration and AI-powered SUMMARY can be added later.
* Media files are stored **temporarily in memory** for the upload command.

