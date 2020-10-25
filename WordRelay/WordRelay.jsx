const React = require('react')
const { useState, useRef } = React; 

const WordRelay = () => {
    const [Word, setWord] = useState('유그미');
    const [Value, setValue] = useState('');
    const [Result, setResult] = useState('');
    const inputRef = useRef(null)
  
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(Word[Word.length - 1] === Value[0]){
            setWord(Value);
            setValue('');
            setResult('딩동댕');
            inputRef.current.focus();
        } else {
            setValue('');
            setResult('땡');
            inputRef.current.focus();
        }
    }
    const onChangeHandler = (e) => {
        setValue(e.target.value);
    }
    return (
        <>
            <div>{Word}</div>
            <form onSubmit={onSubmitHandler}>
                <input type="text" ref={inputRef} value={Value} onChange={onChangeHandler}/>
                <button>입력</button>
            </form>
            <div>{Result}</div>
        </>
    )
}

module.exports = WordRelay;
