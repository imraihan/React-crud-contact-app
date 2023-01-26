export function dateFormat(date) {
    return new Intl.DateTimeFormat('dhaka', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date ? date : Date.now())
};


