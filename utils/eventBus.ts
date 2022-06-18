const eventBus = {
    on(event:any, callback:any) {
        document.addEventListener(event, (e) => callback(e.detail));
    },
    once(event:any, callback:any) {
        document.addEventListener(event, (e) => callback(e.detail), {once:true});
    },
    dispatch(event:any, data:any) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event:any, callback:any) {
        document.removeEventListener(event, callback);
    },
};

export default eventBus;
