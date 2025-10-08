// drive.js
// Stubbed Google Drive functions and handleCommand

async function listFilesInFolder(folderName) {
  if (folderName === '/Reports') {
    return [{ name: 'report1.pdf' }, { name: 'report2.xlsx' }];
  }
  return [];
}

async function uploadToDrive(media) {
  return media; // just return the array for testing
}

async function deleteFromDrive(fileName) {
  if (!fileName) return false;
  return true;
}

async function moveFile(fileName, destFolder) {
  if (!fileName || !destFolder) return false;
  return true;
}

async function handleCommand({ from, body, media }) {
  const cmd = (body || '').trim().split(' ')[0].toUpperCase();

  try {
    if (!['LIST', 'UPLOAD', 'DELETE', 'MOVE'].includes(cmd)) {
      return 'Hello! You can use commands like:\nLIST /folder\nUPLOAD\nDELETE filename\nMOVE filename /destination';
    }

    if (cmd === 'LIST') {
      const folderName = body.split(' ')[1] || '/';
      const files = await listFilesInFolder(folderName);
      if (!files || files.length === 0) return `No files found in folder ${folderName}`;
      return files.map(f => f.name).join('\n');
    }

    if (cmd === 'UPLOAD') {
      if (!media || media.length === 0) return 'No media found to upload.';
      const result = await uploadToDrive(media);
      return `Uploaded ${result.length} file(s) to Drive.`;
    }

    if (cmd === 'DELETE') {
      const fileName = body.split(' ')[1];
      if (!fileName) return 'Please specify a file to delete.';
      const success = await deleteFromDrive(fileName);
      return success ? `${fileName} deleted.` : `File ${fileName} not found.`;
    }

    if (cmd === 'MOVE') {
      const parts = body.split(' ');
      const fileName = parts[1];
      const dest = parts[2];
      if (!fileName || !dest) return 'Usage: MOVE filename /destination';
      const success = await moveFile(fileName, dest);
      return success ? `${fileName} moved to ${dest}` : `Move failed.`;
    }
  } catch (err) {
    console.error('handleCommand error:', err);
    return 'Error processing command: ' + err.message;
  }
}

module.exports = { handleCommand };
