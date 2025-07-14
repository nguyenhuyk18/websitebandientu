const conversationService = require('../services/ConversationServices');
const messageService = require('../services/MessageServices');
const customerService = require('../services/CustomerService');
const dayjs = require('dayjs');

class ChattingController {
    static findConversation = async (id_room) => {
        const conversation = await conversationService.all(`id_room = '${id_room}'`);
        return conversation[0];
    }


    // Liệt kê các conversation có message phục vụ cho admin
    static getConversationHaveMessage = async (req, res) => {
        const mCustomer = new customerService();
        const conversation = await conversationService.all();
        // mảng conversation mới
        const conversation_new = await Promise.all(conversation.map(async (row) => {
            const messageList = await messageService.all(`conversation_id = ${row.id}`);
            const customer = await mCustomer.find(row.customer_id);
            let lastMessage = '';
            if (messageList.length) {
                lastMessage = await messageList[messageList.length - 1]
            }
            return {
                ...row,
                count_message: messageList.length,
                lastMessage: lastMessage.mess,
                customer_username: customer.username
            }
        }))

        // lọc mảng
        const conversationEnd = conversation_new.filter((row) => {
            if (row.count_message == 0) return false;
            return true;
        });
        // console.log(conversationEnd)

        return res.render('admin/chat/index', { conversation: conversationEnd });
    }


    // Hàm này thêm conversation nếu customer có conversation rồi thì kh thêm nữa
    static saveConversation = async (id, username) => {
        const conversation = await conversationService.all(`id_room = '${id}_${username}'`);
        const tmp = conversation.length;

        if (!tmp) {
            const data = {
                customer_id: id,
                created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                id_room: `${id}_${username}`,
                is_read_customer: 1,
                is_read_admin: 2
            }

            const new_conversation = await conversationService.save(data);
            // conversation mới
            return new_conversation.id;
        }
        // conversation cũ
        return conversation[0].id;
    }

    // Lưu tin nhắn vào db
    static saveMessageSend = async (data) => {
        if (await messageService.save(data)) {
            return true;
        }
        return false;
    }


    // Lấy tin nhắn trong một conversation
    static getGetMessageByIDConversation = async (req, res) => {
        const id_room = req.params.slug;

        const conversation = (await conversationService.all(`id_room = '${id_room}'`))[0];

        const allMessage = await messageService.all(`conversation_id = ${conversation.id}`);
        // console.log(allMessage)
        return res.json(allMessage);
    }

    // cập nhật đã đọc
    static updateISread = async (id_room) => {
        const conversation = (await conversationService.all(`id_room = '${id_room}'`))[0];
        conversation.is_read_admin = 2
        await conversationService.update(conversation);
    }

    // update conversation
    static updateConversation = async (req, res) => {
        const mCustomer = new customerService();
        const id_room = req.params.slug;
        const conversation = (await conversationService.all(`id_room = '${id_room}'`))[0];
        conversation.is_read_admin = 1;
        await conversationService.update(conversation);
        const conversations = await conversationService.all();

        const conversation_new = await Promise.all(conversations.map(async (row) => {
            const messageList = await messageService.all(`conversation_id = ${row.id}`);
            const customer = await mCustomer.find(row.customer_id);
            let lastMessage = '';
            if (messageList.length) {
                lastMessage = await messageList[messageList.length - 1]
            }

            return {
                ...row,
                count_message: messageList.length,
                lastMessage: lastMessage.mess,
                customer_username: customer.username
            }
        }))

        const conversationEnd = conversation_new.filter((row) => {
            if (row.count_message == 0) return false;
            return true;
        });

        return res.json(conversationEnd);
    }
}

module.exports = ChattingController;