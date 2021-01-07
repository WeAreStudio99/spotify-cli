/* eslint-disable */

// // Console logger

// export const showTitleAndBanner = (): void => {
//   console.log(`
//                        ▄▄▄▄▄▄▄                   ▄▄▄▄▄▄▄
//                     ▄▌▓▓▓▓▓▓▓▓▓▓▓▄▄           ▄▄▓▓▓▓▓▓▓▓▓▓▓▄▄
//                   ▄▓▓▓▓▓▓▓▀▀▀▓▓▓▓▓▓▓▄       ▄▓▓▓▓▓▓▓▀▀▀▓▓▓▓▓▓▓▄
//                  ▄█▓▓▓▀▀       ▀▓▓▓▓▓▄     ▐▓▓▓▓▌▀       ▀▓▓▓▓▓▄
//                 ▐█▓▓▓▌           ▓▓▓▓▌    ▐▓▓▓▓▌           ▓▓▓▓▓
//                 ▐▓▓▓▓            ▐▓▓▓▓    ▐█▓▓█            ▐▓▓▓█
//                 ▐█▓▓▓▌          ▄▓▓▓▓▌    ▐▓▓▓▓▌          ▐▓▓▓▓▓
//                  ▀▓▓▓▓▓▄      ▄▄▓▓▓▓▓      ▐▓▓▓▓▓▄      ▄▄▓▓▓▓▓
//                   ▐▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▀        ▀▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▀
//                     ▀▓▓▓▓▓▓▓▓▓▓▓▀▀             ▀▓▓▓▓▓▓▓▓▓▓▓▓▀
//                       ▀▓▓▓▓▓▌                      ▐▓▓▓▓▓▓▀
//                         ▀▓▓▓▓▓▄                   ▄▓▓▓▓▓▀
//                          ▀▓▓▓▓▓▓▄               ▄▓▓▓▓▓▀
// 						   ▀▀▀▀▀▀▀             ▀▀▀▀▀▀
//   `);
//   console.log(`
//                                     ,▄▄▌▌▄▄,
//                              ▓   █████████████████
//                         ╓  ████████████████████████████  ▄
//                      ▄ ████████████████████████████████████ ▌
//                     ██████████████████████████████████████████
//                   ██████████████████████████████████████████████ µ
//                 ██████████████████████████████████████████████████
//              ╥ █████████████████████████████████████████████████████▌
//             ███████████████████           ███████████████████████████
//            █████████   █─                        ▌    ████████████████
//           ▄████████▀                                     █  ███████████
//           █████████ ▄  ,▌       █████████       █,              ████████
//           ███████████████████████████████████████████   ,        ███████
//           █████████████████████          █████████████████  ▌,▓ █████████
//          █████████████  █                     ╙    ██████████████████████
//          ████████████         ,▄▄▌███▌▌▄,            ─  █████████████████
//          █████████████    ████████████████████   █          █████████████
//           ██████████████████████████████████████████       ╫█████████████
//          ▀█████████████████                  ████████████ ██████████████
//            ████████████─                        █  █████████████████████
//            ████████████       ████████████     ,     █ ████████████████▀
//            ╙██████████████████████████████████████     ▄███████████████
//              ████████████████████████████████████████████████████████▀
//                ████████████████████████████████████████████████████
//                ▀██████████████████████████████████████████████████
//                    █████████████████████████████████████████████
//                    ▀ ████████████████████████████████████████ █
//                         ██████████████████████████████████
//                          ─  ██████████████████████████  ▀
//                               ╙    ████████████    ▀

//   `);
// };

import figlet from 'figlet';
import { Terminal, terminal } from 'terminal-kit';
import { environment } from '../environments/environment';
import { termConfig } from '../templates/term';

export const showTitleAndBanner = (): void => {
  //   console.log(figlet.textSync('Spotify API x 99stud', { horizontalLayout: 'full', font: 'Santa Clara' }));
  console.log('Spotify Higlight');
};

export class Logger {
  showChat = async (username: string, message: string) => {
    terminal.gray(`[${Buffer.from(message, 'utf-8').toString('hex')}]\n`);
    terminal.green(`[${username}] > `);
    await terminal.slowTyping(`${message}\n\n`, termConfig.slowTypingConfig);
  };

  showFakeLoader = async () => {
    const queue = ['Getting program', 'Downloading program', 'Installing program'];
    const progressBar = terminal.progressBar({
      width: 80,
      eta: true,
      percent: true,
    });
    let countDown = queue.length;

    let progress = 0;
    // Add random progress
    progress += Math.random() / 10;
    progressBar.update(progress);

    if (progress >= 1) {
      // Cleanup and exit
      setTimeout(function () {
        terminal('\n');
        process.exit();
      }, 200);
    } else {
      setTimeout(this.showFakeLoader, 100 + Math.random() * 400);
    }
  };
}
