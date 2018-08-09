import { blackBoard } from "./lib/Constants";
let role: {[key: string]: any};
let sence: {[key: string]: any};
let roleCenter: {[key: string]: any};
let defenseTime: number;

const CheckOneBullet = (
    bullet: {[key: string]: any},
): boolean => {
    const bulletCenter = {
        x: bullet.x + bullet.width / 2,
        y: bullet.y + bullet.height / 2,
    };
    let bulletEnd;
    if (Math.abs(roleCenter.y - bulletCenter.y) > (bullet.height + role.height) / 2) {
        return false;
    }
    // dir 0 for left and 2 for right
    if (bullet.dir === 0) {
        bulletEnd = bullet.startX - bullet.maxDistence - 20;
        if (bulletCenter.x - bulletEnd > sence.width) {
            bulletEnd += sence.width;
        }
        if (roleCenter.x > bulletCenter.x) {
            roleCenter.x -= sence.width;
        }
        if (roleCenter.x < bulletEnd - (bullet.width + role.width) / 2) {
            return false;
        }
        if (bulletCenter.x - roleCenter.x - (bullet.width + role.width) / 2 > defenseTime / 2 * bullet.speed) {
            return false;
        }
    } else {
        bulletEnd = bullet.startX + bullet.maxDistence + 20;
        if (bulletEnd - bulletCenter.x > sence.width) {
            bulletEnd -= sence.width;
        }
        if (roleCenter.x < bulletCenter.x) {
            roleCenter.x += sence.width;
        }
        if (roleCenter.x > bulletEnd + (bullet.width + role.width) / 2) {
            return false;
        }
        if (roleCenter.x - bulletCenter.x - (bullet.width + role.width) / 2 > defenseTime / 2 * bullet.speed) {
            return false;
        }
    }
    return true;
};

const CheckDefense = (): boolean => {
    // console.log("check defense");
    const bullets = blackBoard.bullets;
    role = blackBoard.role;
    sence = blackBoard.sence;
    defenseTime = blackBoard.defenseTime / 1000 * 60;
    roleCenter = {
        x: role.x + role.width / 2,
        y: role.y + role.height / 2,
    };
    for (const bullet of bullets) {
        if (CheckOneBullet(bullet)) {
            return true;
        }
    }
    return false;
};
const CheckAttack = (): boolean => {
    role = blackBoard.role;
    if (role.attackKeepTimer > 0) {
        return false;
    }
    // const enemy = blackBoard.enemy;
    return true;
};

export {
    CheckDefense,
    CheckAttack,
};
