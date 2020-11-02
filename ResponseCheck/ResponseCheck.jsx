import React, {useState, useRef} from 'react'

function ResponseCheck() {
    const [State, setState] = useState('waiting')
    const [Message, setMessage] = useState('클릭해서 시작하세요')
    const [Result, setResult] = useState([])
    //useRef 값을 바꿔도 랜더링이 되지 않음 
    // 랜더링이 필요 없을 시 useRef 사용 
    // 값이 바뀌지만 화면에는 영향을 미치고 싶지 않을때 사용 
    const timeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);
    const onClickScreen = () => {
        if(State === 'waiting') {
            setState('ready')
            setMessage('초록색이 되면 클릭하세요.')
            timeout.current = setTimeout(()=>{
                setState('now')
                setMessage('지금클릭')
                startTime.current = new Date(); 
            },Math.floor(Math.random() + 1000) + 2000); // 2초 ~ 3초 랜덤

        } else if (State === 'ready'){ // 성급하게 클릭
            clearTimeout(timeout.current);
            setState('waiting')
            setMessage('너무 성급하시군요!! 초록색이 된 후에 클릭하세요')

        } else if(State === 'now') {  // 반응속도 체크  
            endTime.current = new Date();
            setState('waiting')
            setMessage('클릭해서 시작하세요')
            setResult((prevResult)=> {
                return [...prevResult, endTime.current - startTime.current];
            })
        }
    }

    const onReset = () => {
        setResult([])
    }
    const renderAverage = () => {
        return Result.length === 0 
        ? null 
        : <>
            <div>평균 시간 : {Result.reduce((a,c)=>a+c) / Result.length} ms</div>
            <button onClick={onReset}>리셋</button>
          </>
    }
    return (
        //  함수에 ()를 쓰고 안쓰고.......... 
        <div>
            <div
                id="screen"
                className={State}
                onClick={onClickScreen}
            >
                {Message}
            </div>
            {renderAverage()}  

            {/* {(()=>{ // 즉시 실행 함수로 만들어 줘야 한다. // 잘 쓰지는 않는다. 
                 if(Result.length === 0 ){
                     return null ;
                } else {
                    return <>
                        <div>평균 시간 : {Result.reduce((a,c)=>a+c) / Result.length} ms</div>
                        <button onClick={onReset}>리셋</button>
                    </>
                }
            })()} */}
               
        </div>
    )
}

export default ResponseCheck


