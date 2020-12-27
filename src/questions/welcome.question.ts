// import { Observable } from 'rxjs';
// import { terminal } from 'terminal-kit';
// import { FileNameEnum } from '../models/files/file.model';
// import { IUser } from '../models/spotify/user.model';
// import { api } from '../spotify-api';
// import { termConfig } from '../templates/term';
// import { parseConfigFile } from '../utils/parser.utils';

// async function bootQuestion(user: IUser): Promise<any> {
//   let choice = false;
//   terminal.yesOrNo({ yes: ['y', 'ENTER'], no: ['n'] }, (error, result) => {
//     if (result) {
//       terminal.brightCyan(`[${user.uri.split('user:')[1]}] > Ok let‘s go\n`);
//       terminal.slowTyping('[ek] > Wise choice my deer \n', termConfig.slowTypingConfig);
//       choice = true;
//     }
//     choice = false;
//     // terminal.brightCyan(`[${user.uri.split('user:')[1]}] > No thanks ...\n`);
//     // terminal.slowTyping(
//     //   `[ek] > DON'T MESS WITH ME ${user.display_name}. I have your picture !!!\n`,
//     //   termConfig.slowTypingConfig,
//     //   () => {
//     //     if (user.images[0]) {
//     //       terminal.drawImage(
//     //         user.images[0].url,
//     //         {
//     //           shrink: { width: terminal.width, height: terminal.height / 1.5 },
//     //         },
//     //         () => {
//     //           terminal.slowTyping(
//     //             '[ek] > I repeat my question, do you want to learn things abouts you ? [Y|n]\n',
//     //             termConfig.slowTypingConfig,
//     //           );
//     //           bootQuestion(user);
//     //         },
//     //       );
//     //     }
//     //   },
//     // );
//     // return false;
//     return choice;
//   });
// }

// export function welcomeQuestion(): Observable<boolean> {
//   return new Observable((observer) => {
//     api.getUserInfo().then(async () => {
//       const user = (await parseConfigFile(FileNameEnum.USER_DATA)) as IUser;
//       terminal.slowTyping(
//         `[ek] > Welcome ${user.uri.split('user:')[1]} or should I say ${user.display_name}\n`,
//         termConfig.slowTypingConfig,
//         async () => {
//           terminal.slowTyping(
//             '[ek] > Do you want to learn things about you ? [Y|n]\n',
//             termConfig.slowTypingConfig,
//             async () => {
//               await bootQuestion(user).then((res) => {
//                 observer.next(res);
//                 observer.complete();
//               });
//             },
//           );
//         },
//       );
//     });
//   });
// }

// //   api.getUserInfo().then(async () => {
// //     const user = (await parseConfigFile(FileNameEnum.USER_DATA)) as IUser;
// //     terminal.slowTyping(
// //       `[ek] > Welcome ${user.uri.split('user:')[1]} or should I say ${user.display_name}\n`,
// //       termConfig.slowTypingConfig,
// //       async () => {
// //         terminal.slowTyping(
// //           '[ek] > Do you want to learn things about you ? [Y|n]\n',
// //           termConfig.slowTypingConfig,
// //         );

// //         await bootQuestion(user).then((response) => response);
// //       },
// //     );
// //   });
