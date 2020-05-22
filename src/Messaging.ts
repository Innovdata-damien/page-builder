import { Options } from './PageBuilder';

// Receive message

export type ReceiveEventsName = 'newInstance' | 'getHtml' | 'getJson' | 'updateOptions';
export type ReceiveMessage = {
    method: ReceiveEventsName;
    instanceId: string;
    options?: Options;
};

export const receiveMessage = (callback: (e: MessageEvent, message: ReceiveMessage) => void) => {

    function cb(e: MessageEvent) {
        var message: ReceiveMessage = e.data;
        callback(e, message);
    }

    if (window['postMessage']) {
        window[callback ? 'addEventListener' : 'removeEventListener']('message', (cb as any), !1);
    }

};

// Post message

export type PostMessageEventsName = 'sendHtml' | 'sendJson';
export type PostMessage = {
    method: PostMessageEventsName;
    instanceId: string;
    value: any
};

export const postMessageToWindow = (source: Window, origin: string, message: PostMessage) => {
    source!.postMessage(message, origin);
}