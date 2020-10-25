import React, { PureComponent, createRef } from 'react'
import Try from './Component/Try'

// this 가 필요 없는 경우 밖으로 뺀다 ~ 
function getNumbers () {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)) , 1)[0];
        array.push(chosen);
    }
    console.log(array,"array")
    return array;
}
class NumberBaseball extends PureComponent {
    state = {
        result:'', 
        value:'',
        answer: getNumbers(),
        tries:[]
    }
    /*
    onSubmitFrom (e) {
    }
    로 쓸 경우 constructor안에서 this.onSubmitFrom = this.onSubmitFrom.bind(this)
    를 해줘야 한다...
    */
    onSubmitFrom = (e) => {
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){ // 정답 일 경우 
            this.setState((prevState) => { // 예전 스테이트로 현재스테이트를 만들때는 함수형 스테이트로 !! 
                 return {
                    result: '홈런',
                    tries: [...prevState.tries, {try:this.state.value, result:'홈런'}] 
                }
            })
            alert('게임을 다시 시작합니다.')
            this.setState({
                value : '',
                answer: getNumbers(),
                tries:[]
            });
        } else { // 답이 틀린 경우
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9) { // 10번이상 틀렸을 경우
                this.setState({
                    result : `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')} 였습니다.`,
                })
                alert('게임을 다시 시작합니다.')
                this.setState({
                    value : '',
                    answer: getNumbers(),
                    tries:[]
                });
                this.inputRef.current.focus();
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if(answerArray[i] === this.state.answer[i]){
                        strike += 1;
                    } else if(this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => { // 예전 스테이트로 현재스테이트를 만들때는 함수형 스테이트로 !! 
                    return {
                        value : '',
                       tries: [...prevState.tries, {try: this.state.value, result:`${strike} 스트라이크, ${ball} 볼입니다`}]
                   }
               })
               this.inputRef.current.focus();
            }
        }
    }
    onChangeHandler = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    inputRef = createRef();
    render() {
        // const {result, value, answer, tries } = this.state; 쓰면 아래 this.state. 안써도됨 (구조분해)
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitFrom}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeHandler} ref={this.inputRef}/>
                </form>
                <div>시도{this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, idx)=> {
                        return (
                            // key 가 성능 최적화 하기 위해 쓰는건데 idx를 써버리면 성능 최적화할때 문제가 생긴다?
                           <Try key={`${idx+1}차 시도`} tryInfo={v} index={idx} /> 
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default NumberBaseball
