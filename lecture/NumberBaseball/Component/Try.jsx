
import React, { memo, useState } from 'react'

//PureComponent//
//PureComponent는 state나 props가 바뀌었늘때만 랜더링
// 복잡한 state는 PureComponent가 다 알아 채지 못할 수도 있다. 
// Component가 복잡해 지면 PureComponent가 안되는 경우도 있다.

//shouldComponentUpdate//
//shouldComponentUpdate 가 필요한경우 PureComponent 안 쓰고 Component랑 쓰기
// 원하는것만 다시 랜더링 가능 (state가 바뀌어도 랜더링 안하게 할수 있다.)
// shouldComponentUpdate(nextProps, nextState, nextContext) { 
// }

// hocks의 경우에는 PureComponent, shouldComponentUpdate 가 없다. 
// memo

// 가장 자식인 경우에 사용하는 것이 좋고 
// 모든 컴포넌트 모두 PureComponent나 memo 인 경우 그의 부모도 PureComponent나 memo를 적용 할수 있다.


const Try = memo(({ tryInfo }) => { // memo
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li> 
    )
});

// function Try ({ tryInfo }) { // props 가 아닌 구조 분해로 많이 사용 
//     return (
//         <li>
//             <div>{tryInfo.try}</div>
//             <div>{tryInfo.result}</div>
//         </li> 
//     )
// }

// function Try (props) {
//     return (
//         <li>
//             <div>{props.tryInfo.try}</div>
//             <div>{props.tryInfo.result}</div>
//         </li> 
//     )
// }

export default Try

