import React, { Component } from 'react'

// class 의 경우 
// -> constructor -> render -> ref -> componentDidMount 
// -> (setState/props 바뀔때마다) -> shouldComponentUpdate(true) -> render -> componentDidUpdate 
// -> 부모가 나를 없앳을 때 -> componentWillUnmount -> 소멸

// class의 경우 
// componentDidMount나 shouldComponentUpdate에서 모든 state를 조건문으로 분기 처리 합니다.

const repCoords = {
    r : '-166px',
    s : '5px',
    p : '-340px'
}
const scores = {
    r : 1,
    s : 0,
    p : -1
}
const computerChoice = (imgCoord) => {
    return Object.entries(repCoords).find(function(v){
        return v[1] === imgCoord;
    })[0]

}

export class RSP extends Component {
    state = {
        result : '',
        score : '0',
        imgCoord : '-166px',
    }
    changeHand = () => {
        if(this.state.imgCoord === repCoords.r) {
            this.setState({
                imgCoord : repCoords.s,
            })
        } else if (this.state.imgCoord === repCoords.s){
            this.setState({
                imgCoord : repCoords.p,
            })
        }else if (this.state.imgCoord === repCoords.p){
            this.setState({
                imgCoord : repCoords.r,
            })
        }
    }
    interval;

    // 라이프 사이클???
    componentDidMount () { // 컴포넌트가 렌더링 된 후 -> 비동기 요청을 많이 한다
        this.interval = setInterval(this.changeHand, 100);
    }
    componentWillUnmount () { // 컴포넌트가 제거되기 직전 -> 비동기 요청 정리를 많이 한다.
        clearInterval(this.interval);
    }
    onClickBtn = (choice) => () => {
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(this.state.imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0) {
            this.setState({
                result: '비겼습니다!!'
            })
        } else if ([-1, 2].includes(diff)){
            this.setState((prevState)=>{
                return {
                    result: '이겼습니다.',
                    score : prevState.score + 1,
                }
            });
        } else {
            this.setState((prevState)=>{
                return {
                    result: '졌습니다.',
                    score : prevState.score - 1,
                };
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 2000);
    };

    render() {
        const { result, score, imgCoord } = this.state
        return (
            <>
                <div id="computer" style={{background:`url(../images/RSP.png) ${imgCoord} center`}}></div>   
                <div>
                    <button id="rock" className="btn" onClick={/*()=>*/this.onClickBtn('r')}>바위</button>
                    <button id="scissor" className="btn" onClick={/*()=>*/this.onClickBtn('s')}>가위</button>
                    <button id="paper" className="btn" onClick={/*()=>*/this.onClickBtn('p')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score} 점</div>
            </>
        )
    }
}

export default RSP
