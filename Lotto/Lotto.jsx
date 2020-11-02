import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import Ball from './Component/Ball'

function getWinNumbers () {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumders = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumders, bonusNumber]
}

function Loto() {
    // useRef 일반 값을 기억
    // useMemo 복잡한 함수 결과값(return 값)을 기억
    // useMemo 함수를 다시실행하지 않고 기억할수 있게 , 두번째 인자가 바뀌지 않는한 다시 실행되지 않는다. 
    // useCallback 함수를 기억
    // useCallback 2번째 인자가 바뀌기 전까지 함수를 기억 한다.
    // hooks는 조건문안에 넣으면 안된다. 함수나 반복문 안에도 웬만하면 넣지 않는다.
    // hooks 안에 hooks 안된다. hooks들은 최상위 ~ 

    const lottoNumders = useMemo(() => getWinNumbers(),[])  
    const [WinNumbers, setWinNumbers] = useState(lottoNumders);
    const [WinBalls, setWinBalls] = useState([]);
    const [Bonus, setBonus] = useState(null);
    const [Redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    

    useEffect(() => {
        for (let i = 0; i < WinNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, WinNumbers[i]])
            }, (i + 1) * 1000);
            timeouts.current[6] = setTimeout(() => {
                setBonus(WinNumbers[6]);
                setRedo(true);
            }, 7000);
        }
        return () => {
            timeouts.current.forEach((v)=>{
                clearTimeout(v)
            })
        }
    }, [timeouts.current])
    


    //componentDidMount 만 
    // useEffect(() => {
    //     //ajax
    // }, [])

    // componentDidUpdate 만 !! componentDidMount XXXXX
    // const mounted = useRef(false);
    // useEffect(() => {
    //     if(!mounted.current) {
    //         mounted.current = true;
    //     } else {
    //         // ajax
    //     }
    // }, [바뀌는값]) 




    // useCallback 2번째 인자 WinNumbers가 바뀌기 전까지 함수를 기억 한다.
    const onClickRedo = useCallback(() => { 
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    },[WinNumbers]);
    return (
        <>
                <div>당첨숫자</div>   
                <div id="result">
                    {WinBalls.map((v)=> <Ball key={v} number={v} /> )}
                </div>
                <div>보너스!</div>
                {/* onClick useCallback예시, 자식 컴포넌트에 넘겨 줄때는 useCallback 해주어야 한다 */}
                {/* 그렇지 않으면 부모 스테이트만 바뀌어도 자식이 계속 랜더링 된다. */}
                {Bonus && <Ball number={Bonus}  onClick={onClickRedo}/>} 
                {Redo && <button onClick={onClickRedo}>한 번 더!!</button>}
                
            </>
    )
}

export default Loto
