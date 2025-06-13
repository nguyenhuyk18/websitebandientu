class staff {
    id = null;
    role_id = null;
    name = null;
    mobile = null;
    username = null;
    password = null;
    email = null;
    is_active = null;

    constructor(id = null, role_id = null, name = null, mobile = null, username = null, password = null, email = null, is_active = null) {
        this.id = id;
        this.role_id = role_id;
        this.name = name;
        this.mobile = mobile;
        this.username = username;
        this.password = password;
        this.email = email;
        this.is_active = is_active;
    }

}

module.exports = staff;
