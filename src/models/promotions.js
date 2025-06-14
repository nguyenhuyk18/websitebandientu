class promotion {
    id = null;
    title = null;
    content = null;
    discount = null;
    from_date = null;
    to_date = null;

    constructor(id, title, content, discount, from_date, to_date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.discount = discount;
        this.from_date = from_date;
        this.to_date = to_date;
    }
}


module.exports = promotion;