import * as React from "react";


class level extends React.Component {
    constructor(props) {
        super(props);
        this.state = {level_value: 0};
    }
    set_value() {
        let temp = this.props.level_value;
        if (temp<3)temp++;
        else temp=0;
        this.setState(
            {level_value:temp}
        );
    }

    render() {
        return (
            <button  onClick={this.set_value}>{this.props.level_value}</button>
        );
    }
}
export default level;