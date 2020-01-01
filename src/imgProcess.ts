import {spawn} from 'child_process';

const pythonProcess = spawn('python3', ["src/img/1.PNG"]);


if(pythonProcess !== undefined) {

    pythonProcess.stdout.on('data', (data) => {
        console.log('data: ', data);
    });
}

