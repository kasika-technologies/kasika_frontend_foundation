import Component from "../component/index.js";

class State extends Component {
    constructor(options) {
        options.isSharedState = true;
        super(null, options);
    }
}

export default State;
