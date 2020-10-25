const React = require('react')
const { Component } = React;


class WordRelay extends Component {
    state = {
        word: '유그미',
        value : '',
        result: '',
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length - 1] === this.state.value[0]){
            this.setState({
                word : this.state.value,
                value : '',
                result: '딩동댕',
            })
            this.input.focus();
        } else {
            this.setState({
                value: '',
                result: '땡',
            })
            this.input.focus();
        }
    }
    onChangeHandler = (e) => {
        this.setState({
            value : e.target.value
        })
    }
    input;
    onRefInput = (c) => {
        this.input  = c
    }
    render() {
        return (
            <div>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitHandler}>
                    <input type="text" ref={this.onRefInput} value={this.state.value} onChange={this.onChangeHandler}/>
                    <button>입력</button>
                </form>
                <div>{this.state.result}</div>
            </div>
        )
    }
}

module.exports = WordRelay;
