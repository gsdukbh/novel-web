/**
 * 设置页面标题
 * @param title
 */
function setDocumentTitle(title: string) {
    document.title = title;
    const ua = navigator.userAgent;
    const regex = /\bMicroMessenger\/([\d.]+)/;
    // 兼容
    if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
        const i = document.createElement('iframe');
        i.src = '/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    }
}

/**
 * 设置标题
 * @param title
 * @param appTitle
 */
export function setTitle(title: string, appTitle?: string) {
    if (title) {
        const _title = title ? ` ${title} - ${appTitle} ` : `${appTitle}`;
        setDocumentTitle(_title);
    }
}

/**
 * 增加时间
 * @param date
 * @param minutes
 */
export function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
}

/**
 * 时间比较
 * @param date1
 * @param date2
 */
export function compareDate(date1: Date, date2: Date): number {
    return date1.getTime() - date2.getTime();
}
