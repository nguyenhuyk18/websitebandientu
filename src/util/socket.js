// khởi tạo socket io 
const http = require('http');
const ChattingController = require('../controllers/ChattingController');
const dayjs = require('dayjs');
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


        socket.on('connect-to-chat-client', async (id, username) => {
            // console.log(id, '    ', username)
            await ChattingController.saveConversation(id, username);
            socket.join(`${id}_${username}`);
            console.log('khách hàng đã vào room ', `${id}_${username}`)
        })


        socket.on('clientsend', async (id, username, giaTri) => {
            const conversation = await ChattingController.findConversation(`${id}_${username}`);
            const data = {
                conversation_id: conversation.id,
                sender_id: id,
                sender_type: 'client',
                sent_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                mess: giaTri,
                is_delete: 0
            }
            await ChattingController.saveMessageSend(data);
            await ChattingController.updateISread(`${id}_${username}`);
            io.emit('clientsendprocess', id, username, giaTri);
        })

        socket.on('adminsend', async (id, username, giaTri) => {
            const conversation = await ChattingController.findConversation(`${id}_${username}`);

            const data = {
                conversation_id: conversation.id,
                sender_id: id,
                sender_type: 'admin',
                sent_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                mess: giaTri,
                is_delete: 0
            }
            await ChattingController.saveMessageSend(data);
            // await ChattingController.updateISread(`${id}_${username}`);
            io.to(`${id}_${username}`).emit('adminsendprocess', giaTri);
        })
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