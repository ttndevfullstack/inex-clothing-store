// import { Injectable } from '@nestjs/common';
// import { PassportSerializer } from '@nestjs/passport';
// import { User } from 'src/schemas/User.schema';
// import { UserService } from 'src/user/service/user.service';

// @Injectable()
// export class SessionSerializer extends PassportSerializer {
//   constructor(private readonly userService: UserService) {
//     super();
//   }

//   serializeUser(user: User, done: any) {
//     console.log('Serializer User');
//     done(null, user);
//   }

//   async deserializeUser(payload: any, done: any) {
//     const user = await this.userService.getUser(payload.email);
//     console.log('Deserialize User');
//     console.log(user);
//     return user ? done(null, user) : done(null, null);
//   }
// }
