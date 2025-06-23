// khởi tạo socket io 
const http = require('http');
let ioInstance = null;
function initSocket(app, sessionMiddleware) {
    // console.log(app)
    const server = http.createServer(app);
    const io = require('socket.io')(server);
    ioInstance = io;
    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    });


    io.on('connection', (socket) => {
        const session = socket.request.session;
        // console.log('A user connected');

        const id_role = session.login?.role_id ?? '';

        socket.on('login-admin', () => {
            if (id_role == 7) {
                socket.join('nhanthongbaodathang');
                console.log('yess sirrrr');
            }
        });


        // socket.on('new order', (data) => {
        //     console.log('new order received', data);
        //     // alert('new order');
        //     socket.to('nhanthongbaodathang').emit('order-notification', {
        //         message: 'Có đơn hàng mới',
        //         order: data
        //     });
        //     // console.log('new order', data);


        // });

    });

    return { io, server }
}



// module.exports = initSocket
module.exports = {
    initSocket,
    ioInstance
};