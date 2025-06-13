const comment = require('../../services/CommentService');

class CommentController {
    static index = async (req, res) => {
        const mComment = new comment();
        const listComment = await mComment.getAll();
        const message = req.session.message;
        delete req.session.message;

        return res.render('admin/comment/index', { listComment: listComment, message: message });
    }

    static delete = async (req, res) => {
        const id = req.params.id;

        const mComment = new comment();

        const oldData = await mComment.find(id);
        if (!oldData) {
            req.session.message = {
                mess: `Comment Này Không Tồn Tại VUI LÒNG KHÔNG CHỈNH SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            });
            return;
        }

        if (await mComment.destroy(id)) {
            req.session.message = {
                mess: `Xóa bình luận thành công !!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/comment.html');
            })
            return;
        }

        req.session.message = {
            mess: `Xóa bình luận không thành công !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/comment.html');
        })
        return;
    }


    static edit = async (req, res) => {
        const id = req.params.id;

        const mComment = new comment();

        const oldData = await mComment.find(id);
        if (!oldData) {
            req.session.message = {
                mess: `Comment Này Không Tồn Tại VUI LÒNG KHÔNG CHỈNH SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            });
            return;
        }
        // console.log(id)

        return res.render('admin/comment/edit', { comment: oldData })

    }

    static update = async (req, res) => {
        const data = req.body;

        const mComment = new comment();

        if (await mComment.update(data)) {
            req.session.message = {
                mess: `Cập nhật bình luận thành công !!!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/comment.html');
            })
            return;
        }
        req.session.message = {
            mess: `Cập nhật bình luận không thành công !!!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/comment.html');
        })
        return;

    }

}

module.exports = CommentController