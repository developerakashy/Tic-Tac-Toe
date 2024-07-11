import React, { useEffect, useRef, useState } from 'react'
import './styles.css'

function ComponentOne(){
    const [count, setCount] = useState(5)

    const [check, setCheck] = useState(true)
    const [vertical, horizontal] = linearArrayCheck()
    const [leftDiagonal, rightDiagonal] = diagonalArrayCheck()


    const initialArray = Array(count * count).fill()
    const [player1, setPlayer1] = useState(initialArray)
    const [player2, setPlayer2] = useState(initialArray)



    useEffect(() => {
        const vertical = gameWinner()
        if(vertical !== false){
            console.log(vertical)
            setPlayer1(initialArray)
            setPlayer2(initialArray)

        }


    })

    const gameWinner = () => {
        const verticalArrayPlayer1 = vertical.map((array,index) =>
            array.every((value) => player1[array[0] - 1] === undefined ? false :  player1[value - 1] === player1[array[0] - 1]) ? index : false
        )

        const verticalArrayPlayer2 = vertical.map((array,index) =>
            array.every((value) => player2[array[0] - 1] === undefined ? false :  player2[value - 1] === player2[array[0] - 1]) ? index : false
        )

        const horizontalArrayPlayer1 = horizontal.map((array,index) =>
            array.every((value) => player1[array[0] - 1] === undefined ? false : player1[value - 1] === player1[array[0] - 1]) ? index : false
        )

        const horizontalArrayPlayer2 = horizontal.map((array,index) =>
            array.every((value) => player2[array[0] - 1] === undefined ? false : player2[value - 1] === player2[array[0] - 1]) ? index : false
        )

        const leftDiagonalArrayPlayer1 = leftDiagonal.every(value => player1[leftDiagonal[0] - 1] === undefined ? false : player1[value - 1] === player1[leftDiagonal[0] - 1])
        const leftDiagonalArrayPlayer2 = leftDiagonal.every(value => player2[leftDiagonal[0] - 1] === undefined ? false : player2[value - 1] === player2[leftDiagonal[0] - 1])

        const rightDiagonalArrayPlayer1 = rightDiagonal.every(value => player1[rightDiagonal[0] - 1] === undefined ? false : player1[value - 1] === player1[rightDiagonal[0] - 1])
        const rightDiagonalArrayPlayer2 = rightDiagonal.every(value => player2[rightDiagonal[0] - 1] === undefined ? false : player2[value - 1] === player2[rightDiagonal[0] - 1])

        let verticalCheckPlayer1 = verticalArrayPlayer1.filter((val) => val !== false )
        let verticalCheckPlayer2 = verticalArrayPlayer2.filter((val) => val !== false )

        let horizontalCheckPlayer1 = horizontalArrayPlayer1.filter(val => val !== false)
        let horizontalCheckPlayer2 = horizontalArrayPlayer2.filter(val => val !== false)

        if(verticalCheckPlayer1.length || verticalCheckPlayer2.length){
            return {Column : vertical[verticalCheckPlayer1[0]] ? vertical[verticalCheckPlayer1[0]] : vertical[verticalCheckPlayer2[0]]}
        }
        else if(horizontalCheckPlayer1.length || horizontalCheckPlayer2.length){
            return {Row: horizontal[horizontalCheckPlayer1[0]] ? horizontal[horizontalCheckPlayer1[0]] : horizontal[horizontalCheckPlayer2[0]]}

        }else if(leftDiagonalArrayPlayer1 || leftDiagonalArrayPlayer2){
            return {leftArray: leftDiagonal, player: leftDiagonalArrayPlayer1 ? 'Player1' : 'Player2'}

        }else if(rightDiagonalArrayPlayer1 || rightDiagonalArrayPlayer2){
            return  {rightArray: rightDiagonal, player: rightDiagonalArrayPlayer1 ? 'Player1' : 'Player2'}

        }else{
            return false
        }
    }



    function linearArrayCheck(){
        let arrayCount = 1

        let horizontalInit = 1
        let horizontalArrays = []

        let verticalInit = 1
        let verticalArrays = []

        while(arrayCount <= count){
            let currHorizontalValue = horizontalInit
            let horizontalArrayTemp = [currHorizontalValue]

            let currVerticalValue = verticalInit
            let verticalArrayTemp = [currVerticalValue]

            for(let i=1; i < count; i++){
                horizontalArrayTemp.push(currHorizontalValue + 1)
                currHorizontalValue = currHorizontalValue + 1

                verticalArrayTemp.push(currVerticalValue + count)
                currVerticalValue = currVerticalValue + count
            }

            horizontalArrays.push(horizontalArrayTemp)
            horizontalArrayTemp = []
            horizontalInit += count

            verticalArrays.push(verticalArrayTemp)
            verticalArrayTemp = []
            verticalInit += 1

            arrayCount += 1
        }

        return [verticalArrays,horizontalArrays]
    }

    function diagonalArrayCheck(){
        let leftDiagonalInit = 1
        let rightDiagonalInit = count

        let leftTravelCount = count + 1
        let rightTravelCount = count - 1

        let leftDiagonalArray = [leftDiagonalInit]
        let rightDiagonalArray = [rightDiagonalInit]

        for(let i=1; i<count; i++){
            leftDiagonalArray.push(leftDiagonalInit + leftTravelCount)
            rightDiagonalArray.push(rightDiagonalInit + rightTravelCount)

            leftDiagonalInit += leftTravelCount
            rightDiagonalInit += rightTravelCount
        }

        return [leftDiagonalArray,rightDiagonalArray]

    }





    const clickListener = (event, btn_index) => {
        if(check){
            event.target.textContent = 1
            player1.splice(btn_index, 1, 0)
            setCheck(false)
        }else{
            event.target.textContent = 0
            player2.splice(btn_index, 1, 1)
            setCheck(true)
        }

        console.log(player1.length)

    }



    let divArray = horizontal.map((array,index) => <div key={index}>
        {array.map((item)=> <button key={item} onClick={(event) => clickListener(event,item - 1)}></button>)}
    </div>)

    return(
        <div>
            <input type="number" />
            {divArray}
            {/* <button onClick={}>Reset</button> */}
        </div>
    )
}

export default ComponentOne
