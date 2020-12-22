function deferredPromise () {
    let _resolve, _reject
    const p = new Promise((resolve, reject) => {
        _resolve = resolve
        _reject = reject
    }).catch(() => {}) // do nothing in the event that this promise is rejected
    p.resolve = _resolve
    p.reject = _reject
    return p
}

export const authPromise = deferredPromise()
