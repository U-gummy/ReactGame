import React, { useState, useRef ,memo } from 'react'
import Try from './Component/Try'

// this 가 필요 없는 경우 밖으로 뺀다 ~ 
function getNumbers () {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)) , 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = memo(() => {
    const [Result, setResult] = useState('')
    const [Value, setValue] = useState('')
    const [Answer, setAnswer] = useState(getNumbers())
    const [Tries, setTries] = useState([])

    
    const onSubmitFrom = (e) => {
        e.preventDefault();
        if(Value === Answer.join('')){ // 정답 일 경우 
            setResult('홈런');
            setTries((prevTries) => {
                return [...prevTries, {try:Value, result:'홈런'}]
            })
            alert('게임을 다시 시작합니다.')
            setValue('')
            setAnswer(getNumbers())
            setTries([])
        } else { // 답이 틀린 경우
            const answerArray = Value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(Tries.length >= 9) { // 10번이상 틀렸을 경우
                setResult(`10번 넘게 틀려서 실패! 답은 ${Answer.join(',')} 였습니다.`);
                alert('게임을 다시 시작합니다.')
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if(answerArray[i] === Answer[i]){
                        strike += 1;
                    } else if(Answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setValue('');
                setTries((prevTries) => {
                    return [...prevTries, {try: Value, result:`${strike} 스트라이크, ${ball} 볼입니다`}]
                })
            }
        }
    }
    const onChangeHandler = (e) => {
        setValue(e.target.value)
    }

    return (
        <>
            <h1>{Result}</h1>
            <form onSubmit={onSubmitFrom}>
                <input maxLength={4} value={Value} onChange={onChangeHandler}/>
            </form>
            <div>시도{Tries.length}</div>
            <ul>
                {Tries.map((v, idx)=> {
                    return (
                        // key 가 성능 최적화 하기 위해 쓰는건데 idx를 써버리면 성능 최적화할때 문제가 생긴다?
                    <Try key={`${idx+1}차 시도`} tryInfo={v} index={idx} /> 
                    )
                })}
            </ul>
        </>
    )
})

export default NumberBaseball

