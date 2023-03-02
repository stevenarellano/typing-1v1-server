"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnectResponse = exports.getVisitNumberInSecond = void 0;
function getVisitNumberInSecond(date, lastAccess) {
    if (date.getSeconds() === lastAccess) {
        return 2;
    }
    else {
        return 1;
    }
}
exports.getVisitNumberInSecond = getVisitNumberInSecond;
function createConnectResponse(starting, msg, player_id) {
    return {
        starting,
        msg,
        player_id,
    };
}
exports.createConnectResponse = createConnectResponse;
