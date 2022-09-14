export const dateFormat = (dt) => {

    const milliseconds = dt * 1000;

    const myDate = new Date(milliseconds);

    const date = myDate.toLocaleString('en-GB').split(',')[0];

    const day = myDate.toLocaleString('en-US', { weekday: 'long' });

    return { date, day };
}