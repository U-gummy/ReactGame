
import React, { useState, useRef, useEffect } from 'react'

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

function RSP() {
    const [Result, setResult] = useState('')
    const [ImgCoord, setImgCoord] = useState(repCoords.r)
    const [Score, setScore] = useState(0)
    const interval = useRef();

    const changeHand = () => {
        if(ImgCoord === repCoords.r) {
            setImgCoord(repCoords.s)
        } else if (ImgCoord === repCoords.s){
            setImgCoord(repCoords.p)
        }else if (ImgCoord === repCoords.p){
            setImgCoord(repCoords.r)
        }
    }

    useEffect(() => { // componentDidMount, componentWillUnmount 역할 (1대1 대응은 아님)
        interval.current = setInterval(changeHand, 100);
        return () => { //componentWillUnmount 역할  // 컴포넌트가 제거되기 직전 -> 비동기 요청 정리를 많이 한다.
            clearInterval(interval.current);
        }
    }, [ImgCoord])

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(ImgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0) {
            setResult('비겼습니다!!')
        } else if ([-1, 2].includes(diff)){
            setResult('이겼습니다!!')
            setScore((prevScore)=> prevScore + 1)
        } else {
            setResult('졌습니다...')
            setScore((prevScore)=> prevScore - 1)
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 2000);
    };


    return (
        <>
            <div id="computer" style={{background:`url(../images/RSP.png) ${ImgCoord} center`}}></div>   
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('r')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('s')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('p')}>보</button>
            </div>
            <div>{Result}</div>
            <div>현재 {Score} 점</div>
        </>
    )
}

export default RSP


