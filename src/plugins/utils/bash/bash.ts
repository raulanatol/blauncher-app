import { exec } from 'child_process';

export const bashExecute = async (script: string[] | string) => {
  const scriptToRun = Array.isArray(script) ? script.join(' && ') : script;
  return new Promise((resolve, reject) => {
    exec(scriptToRun, ((error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      console.log('>>', error, stdout, stderr);
      resolve(stdout);
    }));
  });
};
