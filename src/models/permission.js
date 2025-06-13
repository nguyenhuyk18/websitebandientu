class permission {
    role_id = null;
    action_id = null;

    constructor(role_id = null, action_id = null) {
        this.role_id = role_id;
        this.action_id = action_id;
    }
}

module.exports = permission