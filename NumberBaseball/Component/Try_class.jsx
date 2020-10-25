import React, { PureComponent } from 'react'

//PureComponent//
//PureComponent는 state나 props가 바뀌었늘때만 랜더링
// 복잡한 state는 PureComponent가 다 알아 채지 못할 수도 있다. 
// Component가 복잡해 지면 PureComponent가 안되는 경우도 있다.

//shouldComponentUpdate//
// 원하는것만 다시 랜더링 가능 (state가 바뀌어도 랜더링 안하게 할수 있다.)
// shouldComponentUpdate(nextProps, nextState, nextContext) { 
// }

class Try extends PureComponent { 

    render() {
        const { tryInfo } = this.props;
        return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li> 
        )
    }
}

export default Try
