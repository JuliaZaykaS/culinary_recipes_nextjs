import {handlers} from "@/auth/auth";
//  для взаимодействия с бэкендовой частью

export const {GET, POST} = handlers;


// http://localhost:3000/api/auth/signin
// http://localhost:3000/api/auth/signout
// http://localhost:3000/api/auth/callback
// http://localhost:3000/api/auth/session