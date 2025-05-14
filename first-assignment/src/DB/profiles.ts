import { Film } from "./films";

export type LoginInfo = {
    username: string;
    password: string;
}
export type Profile = {
    id: number;
    name: string;
    picture: string;
    library: Film[];
    login: LoginInfo;
};

export const profiles: Profile[] = [
    {id: 0 , name: 'Kelsi Kapidani' , picture: '/assets/no_image.jpg' , library: [] , login: {username: 'KelsiKapidani' , password: '07042001Kk'}},
    {id: 1 , name: 'Ndricim Jahaj' , picture: '/assets/no_image.jpg' , library: [] , login: {username: 'NdricimJahaj' , password: '07042001Nj'}}
];

export function findProfile(id: number) {
    for (const profile of profiles) {
        if (profile.id===id) {
            return profile;
        }
    }
    return false;
}

export function findUN(username: string) {
    for (const profile of profiles) {
        if (profile.login.username===username) {
            return profile;
        }
    }
    return false;
}