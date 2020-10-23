// const React = require('react')  // require는 노드의 모듈 시스템
// const ReactDom = require('react-dom')
// const WordRelay = require('./WordRelay/WordRelay')

// ES2015 모듈 문법 // 노드는 이 문법을 지원 하지 않는다 . 바벨이 import를 require로 바꿔주므로 사용 가능
import React from 'react' 
import ReactDom from 'react-dom'
import WordRelay from './WordRelay/WordRelay'
import NumberBaseball from './NumberBaseball/NumberBaseball'

ReactDom.render(<div><WordRelay /><NumberBaseball /></div>, document.querySelector('#root'))