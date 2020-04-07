import child_process from 'child_process';

export const docToPdf = async (docPath: string) => {
  return new Promise((resolve, reject) => {
    let buffer = [];
    let error = [];

    const conversion = child_process.spawn('unoconv', ['--stdout', '-f', 'pdf', docPath]);

    conversion.stdout.on('data', (data: string) => {
      buffer.push(data);
    });

    conversion.stderr.on('data', (err) => {
      error.push(err);
    });

    conversion.on('close', (code) => {
      if (code !== 0) {
        reject('Conversion exited with code ' + code);
      } else if (error.length) {
        reject(Buffer.concat(error).toString());
      } else {
        resolve(Buffer.concat(buffer) as ArrayBuffer);
      }
    });
  });
};
