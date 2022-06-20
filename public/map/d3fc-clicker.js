
export const fcClickPointer = () => {
    const clickEvent = d3.dispatch('click');

    function mouseclick(event) {
        const point = d3.pointer(event);
        clickEvent.call('click', this, [{ x: point[0], y: point[1] }]);
    }

    const instance = (selection) => {
        selection
            .on('click.pointer', mouseclick);

    };

    fc.rebind(instance, clickEvent, 'on');

    return instance;
};